export const state = () => ({
    courseItems:'',
    filter:'',
    newsItems:'',
    newsFilter:'',
    studentCount:'',
    newsCount:''
})

export const mutations = {
    SET_ITEMS(state, items){
        state.courseItems = items
    },
    SET_Filter(state, filter){
        state.filter = filter
    },
    SET_ITEMS_NEWS(state, items){
        state.newsItems = items
    },
    SET_Filter_NEWS(state, filter){
        state.newsFilter = filter
    },
    SET_STUDENT_COUNT(state, studentCount){
        state.studentCount = studentCount
    },
    SET_NEWS_COUNT(state, newsCount){
        state.newsCount = newsCount
    }
}

export const actions = {
    async search({commit},searchInput) {
        const courses = await this.$axios.get(`/api/Course/Index?search=${searchInput}`);
        if (courses.data.statusCode == 200 && courses.data.message == "Success") {
            commit('SET_ITEMS',courses.data.data.courseItems) ;
            commit('SET_Filter',courses.data.data.filter) ;
            commit('SET_STUDENT_COUNT',courses.data.data.studentCount)
        }
      },
      async searchNews({commit},searchInput) {
        const news = await this.$axios.get(`/api/News/Index?search=${searchInput}`);
        if (news.data.statusCode == 200 && news.data.message == "Success") {
            commit('SET_ITEMS_NEWS',news.data.data.newsItems) ;
            commit('SET_Filter_NEWS',news.data.data.filter) ;
            commit('SET_NEWS_COUNT',news.data.data.newsCount)
        }
      },
}
