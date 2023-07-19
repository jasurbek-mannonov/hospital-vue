import cookies  from "vue-cookies"

export const auth = {
    state: () => ({
        user: {},
        token: {}
    }),
    getters: {
        user({user}){
            return user
        },
        token({token}){
            return token
        }
    },
    mutations: {
        SET_USER(state, payload){
            state.user = payload
        },
        SET_TOKEN(state, payload){
            state.token = payload
        }
    },
    actions:{
        async login({dispatch, commit}, payload){
            let res = await dispatch('postAxios', {
                url: `auth/login`,
                data: payload
            })
            if(res?.status == 200){
                let {token, user} = res.data
                commit('SET_USER', user)
                commit('SET_TOKEN', token)
                commit('SET_NOTIF', {
                    type: 'success',
                    text: 'Xush kelibsiz!'
                })
                
                cookies.set('hospital-token', token)
                cookies.set('hospital-user', user)

                commit('SET_LAYOUT', 'def')
            }
        },   
        async checkUser({dispatch, commit}){
            if(cookies.isKey('hospital-user') && cookies.isKey('hospital-token')){
                commit('SET_USER', cookies.get('hospital-user'))
                commit('SET_TOKEN', cookies.get('hospital-token'))
                
                let user = cookies.get('hospital-user')
                let res = await dispatch('postAxios',{
                    url: `auth/checkuser`,
                    data: {
                        id: user.id
                    }
                })
                if(res.status == 200){
                    // console.log(res.data)
                    cookies.set('hospital-user', res.data)
                    commit('SET_USER', res.data)
                    commit('SET_LAYOUT', 'def')
                }
            }else{
                cookies.remove('hospital-user')
                cookies.remove('hospital-token')
                commit('SET_LAYOUT', 'auth')
            }
        }
    }
}