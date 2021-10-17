export default async function ({ app,store, redirect,$axios,route }) {
    // if (store.state.login.apiKey=='') {
      if (app.$cookies.get('key')) {
        const getData=await $axios
        .post(
          "/api/Teacher/TeacherAccount/check-teacher-auth",
          {},
          {
            headers: {
              Authorization: `Bearer ${app.$cookies.get("key")}`,
            },
          }
        )
        if(getData.data.statusCode==200&&getData.data.message=="Success"){
          if(getData.data.data.isBlock==true){
            return redirect('/ban')
          }
          if(getData.data.data.isFullyAccepted==false){
            return redirect('/register-one')
          }
        }
        else{
          app.$cookies.remove('refreshToken')
          app.$cookies.remove('key')
        }
      }
      else{
        if(app.$cookies.get('refreshToken')){
          try{
            const getToken = await $axios.post('/api/Teacher/TeacherAccount/refresh',
              {refreshToken:app.$cookies.get('refreshToken')}
            )
            if(getToken.data.statusCode==200 && getToken.data.message == "Success"){
              store.dispatch('login/setLoginDetails',getToken);
              if(getToken.data.data.isFullyAccepted==false){
                return redirect('/register-one')
              }
              if(getToken.data.data.isBlock==true){
                return redirect('/ban')
              }
            }
            else{
              app.$cookies.remove('refreshToken')
              return redirect('/login')
            }
          }catch(e){
            app.$cookies.remove('refreshToken')
              return redirect('/login')
          }
        }else{
          app.$cookies.remove('refreshToken')
          return redirect('/login')
        }
      }
    }
  // }