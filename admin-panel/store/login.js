export const state = () => ({
    phoneNumber : '',
    password:'',
    apiKey:'',
    name:'',
})

export const mutations = {
    SET_PHONE_NUMBER(state, number){
        state.phoneNumber = number
    },
    SET_PASSWORD(state, password){
        state.password = password
    },
    SET_LOGIN_DETAILS(state,{name,phone}){
        state.name=name
        state.phoneNumber=phone
    },
}

export const actions = {
    setLoginDetails({ commit },resp){
        const name = resp.data.data.adminName
        const phone = resp.data.data.phoneNumber
        commit('SET_LOGIN_DETAILS',{name,phone})
        const today = new Date()
        const endTime= new Date(resp.data.data.expireTime)
        this.$cookies.set('key',resp.data.data.tokenString,{
            path: '/',
            maxAge:(endTime.getTime()-today.getTime())/1000
        })
        this.$cookies.set('refreshToken',resp.data.data.refreshToken,{
            path: '/',
            maxAge: 60 * 60 * 24 * 1
        })
    },
    clearToken(){
        this.$cookies.remove('key')
        this.$cookies.remove('refreshToken')
    }
}
