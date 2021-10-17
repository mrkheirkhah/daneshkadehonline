export default async function ({ app,store, redirect,$axios }) {
    if (app.$cookies.get('key')) {
        const getData = await 
            $axios
            .post(
                "/api/Teacher/TeacherAccount/check-teacher-auth",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${app.$cookies.get("key")}`,
                    },
                }
            )
            if(getData.data.statusCode=='200'){
                return redirect('/')
            }
            else{
                app.$cookies.remove('key')
                app.$cookies.remove('refreshToken')
            }
    }else if(app.$cookies.get("refreshToken")){
        const getToken = await $axios.post('/api/Teacher/TeacherAccount/refresh',
            {refreshToken:app.$cookies.get('refreshToken')}
          )
          if(getToken.data.statusCode==200 &&getToken.data.message=="Success"){
            store.dispatch('login/setLoginDetails',getToken);
            return redirect('/')
          }
          else{
            app.$cookies.remove('refreshToken')
            return redirect('/login')
          }
    }
}