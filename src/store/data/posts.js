import http from "../../utils/http"

 const posts = {
    namespaced: true,
    state() {
        return {
            departments: [],
        }
    },
    getters: {
        // longPosts(state) {
        //     return state.posts.filter(post => post.title.length > 30)
        // },
        // shortPosts: state => state.posts.filter(post => post.title.length <= 30),
        // allPosts: state => state.posts
    },
    mutations: {
        POSTS_INSERT(state, payload) {
            state.posts = [...payload.map(item => {
                item.count = item.title.length
                return item
            })]
        },
        SET_POSTS(state, departments) {
            state.departments = departments
        },
        CREATE_POST(state, newPost) {
            state.departments.unshift(newPost)
        }

    },
    actions: {
        async getPosts({
            commit
        }) {
            try {
                const {
                    data
                } = await http.get('/department')
                commit("SET_POSTS", data)

                return data
            } catch (e) {
                return Promise.reject(e)
            }

        },
        async createPost({commit}, department) {
            try {
                const {data} = await http.post('/department', department)
                commit("CREATE_POST", data)

                return data
            } catch(e) {
                return Promise.reject(e)
            }
        }
    }
}

export default posts