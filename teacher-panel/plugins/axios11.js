import qs from 'qs'
import { handleErrors, handleResponse } from '@/helpers/responseHelper'

const createInstance = ({app, $axios, ...context }) => {
  const api = $axios.create({
    paramsSerializer: (params) => {
      return qs.stringify(params, { arrayFormat: 'brackets' })
    },
  })

  // Set baseURL to something different

  api._post = function (url, body, config = {}) {
    const { cc, ...requestConfig } = config
    return api
      .post(url, body, requestConfig)
      .then((response) => {
        return handleResponse(response, cc)
      })
      .catch((e) => {
        handleErrors(e, cc, context)
      })
  }
  api._get = function (url, config = {}) {
    const { cc, ...requestConfig } = config
    return api
      .get(url, requestConfig)
      .then((response) => {
        return handleResponse(response, cc)
      })
      .catch((e) => {
        handleErrors(e, cc, context)
      })
  }
  return api
}

export default function (context, inject) {
  const { store, $axios , app } = context
  // Create a custom axios instance
  const api = createInstance(context)
  api.onRequest((config) => {
    config.headers.Authorization = 'Bearer ' + app.$cookies.get('key')
  })
  //* ****handle error *********
  let isRefreshing = false
  let failedQueue = []

  const processQueue = (error, token = null) => {
    failedQueue.forEach((prom) => {
      if (error) {
        prom.reject(error)
      } else {
        prom.resolve(token)
      }
    })

    failedQueue = []
  }
  api.onResponseError((error) => {
    const code = parseInt(error.response && error.response.status);
    const originalRequest = error.config
    if (code === 401 && !originalRequest._retry) {
      if (isRefreshing) {
        return new Promise(function (resolve, reject) {
          failedQueue.push({ resolve, reject })
        })
          .then((token) => {
            originalRequest.headers.Authorization = 'Bearer ' + token
            return api(originalRequest)
          })
          .catch((err) => {
            return Promise.reject(err)
          })
      }

      originalRequest._retry = true
      isRefreshing = true
      const refreshToken = app.$cookies.get('refreshToken')
      return new Promise(function (resolve, reject) {
        let refresh = $axios.post('/api/Teacher/TeacherAccount/refresh',{refreshToken:refreshToken})
                .then( (response)=>{
                    if(response.status==200){
                        if(response.data.statusCode==200){
                            store.dispatch('login/setLoginDetails',response);
                            api.setToken('Bearer ' + response.data.data.tokenString)
                            originalRequest.headers.Authorization = `Bearer ${response.data.data.tokenString}`;                       
                            processQueue(null, response.data.data.tokenString)
                            api(originalRequest).then(res=>{
                              return(res)
                            })
                            // resolve(api(originalRequest))
                        }
                        else{
                            app.$cookies.remove('key')
                            app.$cookies.remove('refreshToken')
                            app.router.push('/login')
                        }
                    }
                    else{
                        app.$cookies.remove('key')
                        app.$cookies.remove('refreshToken')
                        app.router.push('/login')
                    }
                }).catch(e=>{
                    app.$cookies.remove('key')
                    app.$cookies.remove('refreshToken')
                    app.router.push('/login')
                })
            }).then(()=>{
                isRefreshing = false
            }).catch(e=>{
                app.$cookies.remove('key')
                app.$cookies.remove('refreshToken')
                app.router.push('/login')
            })
        }
        return Promise.reject(error)
    })


  // Inject to context as $api
  inject('api', api)
}
