export const state = () => ({
    minute : 1,
    sec : 30,
    timer:true
})

export const mutations = {
    REDIUS_SEC(state){
        state.sec--;
    },
    SET_SEC(state , number){
        state.sec = number
    },
    REDIUS_MIN(state){
        state.minute--;
    },
    SET_MIN(state , number){
        state.minute = number
    },
    SET_TIMER(state , bool){
        state.timer = bool
    },
}

export const actions = {
    
      resetCounter({commit}) {
        commit('SET_MIN',1)
        commit('SET_SEC',30)
      }
}
