export default async function ({ app,store,route, redirect,$axios }) {
    // if (store.state.login.apiKey=='') {
      if (app.$cookies.get('key')) {
        const getData=await $axios
        .post(
          "/api/Admin/AdminAccount/check-admin-auth",
          {},
          {
            headers: {
              Authorization: `Bearer ${app.$cookies.get("key")}`,
            },
          }
        )
        if(getData.data.statusCode==200&&getData.data.message=="Success"){
          if(getData.data.data.role=="Writer"){
            if(route.path!='/manage-news'){
              return redirect('/manage-news')
            }
          }
          else if (getData.data.data.role == "Support") {
            const canGotToRoute =
              [
                "/students-list",
                "/add-teacher",
                "/tickets",
                "/see-ticket/",
                "/student-profile/",
                "/options/",
                "/teachers-list",
                "/see-profile/",
                "/student-details/"
              ]
                .filter(pageLink => route.path.includes(pageLink))
                .filter(Boolean).length === 0;
                 if (canGotToRoute) {
                   return redirect("/teachers-list");
                 }
               }
          if(getData.data.data.isBlocked==true){
            return redirect('/ban')
          }
        
        }else{
          app.$cookies.remove('key')
          app.$cookies.remove('refreshToken')
          return redirect('/login')
        }
      }
      else{
        if(app.$cookies.get('refreshToken')){
          try{
            const getToken = await $axios.post('/api/Admin/AdminAccount/refresh',
            {refreshToken:app.$cookies.get('refreshToken')}
            )
            if(getToken.data.statusCode==200 &&getToken.data.message == "Success"){
              store.dispatch('login/setLoginDetails',getToken);
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
          return redirect('/login')
        }
      }
    }
  // }