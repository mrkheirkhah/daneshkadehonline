export default async function ({ app,store, redirect,$axios }) {
    if (app.$cookies.get('key')) {
        const getData = await 
            $axios
            .post(
                "/api/Student/StudentAccount/check-student-auth",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${app.$cookies.get("key")}`,
                    },
                }
            )
            if(getData.data.statusCode=='200' && getData.data.message=="Success"){
                return redirect('/my/')
            }else{
                app.$cookies.remove('refreshToken')
                app.$cookies.remove('key')
                return redirect('/my/login')
            }
    }else if(app.$cookies.get("refreshToken")){
        const getToken = await $axios.post('/api/Student/StudentAccount/refresh',
            {refreshToken:app.$cookies.get('refreshToken')}
          )
          if(getToken.data.statusCode==200 && getToken.data.message=="Success"){
            store.dispatch('login/setLoginDetails',getToken);
            return redirect('/my/')
          }
          else{
            app.$cookies.remove('refreshToken')
            return redirect('/my/login')
          }
    }
}