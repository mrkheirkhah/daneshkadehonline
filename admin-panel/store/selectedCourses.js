export const state = () => ({
    selectedCourses : [],
    useCount:'',
    discountName:'',
    discountPercentage:'',
    discountForCourceRadio:'all',
    discountCode:'',
    startDate:'',
    endDate:'',
    submitType:'add',
    editThisId:''
})

export const mutations = {
    SET_SELECTED(state, itesList){
        state.selectedCourses = itesList
    },
    CLEAR_SELECTED(state){
        state.selectedCourses = ''
    },
    SET_DISCOUNT_DETAIL(state,data){
        state.useCount = data.useCount
        state.discountName = data.discountName
        state.discountPercentage = data.discountPercentage
        state.discountCode = data.discountCode
        state.startDate = data.startDate
        state.endDate = data.endDate
        state.discountForCourceRadio=data.discountForCourceRadio
        state.submitType = data.submitType
        state.editThisId=data.editThisId

    },
    CLEAR_DISCOUNT_DETAIL(state){
        state.useCount=''
        state.discountName=''
        state.discountPercentage=''
        state.discountCode=''
        state.startDate=''
        state.endDate=''
        state.discountForCourceRadio='all'
        state.submitType="add",
        state.editThisId=''
    }
    
}

export const actions = {
    
}
