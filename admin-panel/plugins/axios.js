export default function({$axios,store,app}){
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
    $axios.onResponseError(err=>{
        const code = parseInt(err.response && err.response.status);
        let originalRequest = err.config;
        if(code==401 && !originalRequest._retry){
            if (isRefreshing) {
                return new Promise(function (resolve, reject) {
                  failedQueue.push({ resolve, reject })
                })
                  .then((token) => {
                    originalRequest.headers.Authorization = 'Bearer ' + token
                    return $axios(originalRequest)
                  })
                  .catch((err) => {
                    return Promise.reject(err)
                  })
              }
            originalRequest._retry = true
            isRefreshing = true
    
            let token = app.$cookies.get('refreshToken');
            return new Promise((resolve,reject)=>{
                let refresh = $axios.post('/api/Admin/AdminAccount/refresh',{refreshToken:token})
                .then(response=>{
                        if(response.data.statusCode==200 && response.data.message=="Success"){
                            store.dispatch('login/setLoginDetails',response);
                            originalRequest.headers['Authorization'] = `Bearer ${response.data.data.tokenString}`;                       
                            processQueue(null, response.data.data.tokenString)
                            resolve($axios(originalRequest))
                        }
                        else{
                            app.$cookies.remove('key')
                            app.$cookies.remove('refreshToken')
                            // app.router.push('/my/login-with-number')
                        }
                
                }).catch(e=>{
                    app.$cookies.remove('key')
                    app.$cookies.remove('refreshToken')
                    // app.router.push('/my/login-with-number')
                })
            }).then(()=>{
                isRefreshing = true
            }).catch(e=>{
                app.$cookies.remove('key')
                app.$cookies.remove('refreshToken')
                // app.router.push('/my/login-with-number')
            })
        }
        return Promise.reject(error)
    })
}