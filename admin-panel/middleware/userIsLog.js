export default async function ({ app,store, redirect,$axios }) {
    if (app.$cookies.get('key')) {
        const getData = await 
            $axios
            .post(
                "/api/Admin/AdminAccount/check-admin-auth",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${app.$cookies.get("key")}`,
                    },
                }
            )
            if(getData.data.statusCode=='200'&&getData.data.message=="Success"){
                return redirect('/')
            }
    }else if(app.$cookies.get("refreshToken")){
        const getToken = await $axios.post('/api/Admin/AdminAccount/refresh',
            {refreshToken:app.$cookies.get('refreshToken')}
          )
          if(getToken.data.statusCode==200){
            store.dispatch('login/setLoginDetails',getToken);
          }
          else{
            app.$cookies.remove('refreshToken')
            return redirect('/login')
          }
    }
}