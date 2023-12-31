import http from '../../utils/http'
import cookies  from "vue-cookies"

export const helpers = {
    actions: {
        async getAxios({getters}, payload){
            return await http.get(`${getters.mainUrl}/${payload}`, {
                headers: {
                    "authorization": `Bearer ${getters.token}`
                }
            })
        },
        async postAxios({getters, commit}, payload){
            return await http.post(`${getters.mainUrl}/${payload.url}`, payload.data, {
                headers: {
                    "authorization": `Bearer ${getters.token}`
                }
            }).catch(e => {
                let {data, status} = e.response
                commit('SET_NOTIF', {
                    type: 'danger',
                    text: data
                })
                if(status == 404){
                    cookies.remove('hospital-user')
                    cookies.remove('hospital-token')
                    commit('SET_LAYOUT', 'auth')
                }
                // console.clear()
            })
        },
        async deleteAxios({getters}, payload){
            return await http.delete(`${getters.mainUrl}/${payload}`,{
                headers: {
                    "authorization": `Bearer ${getters.token}`
                }
            })
        },
        async putAxios({getters, commit}, payload){
            return await http.put(`${getters.mainUrl}/${payload.url}`, payload.data, {
                headers: {
                    "authorization": `Bearer ${getters.token}`
                }
            }).catch(e => {
                let {data, status} = e.response
                commit('SET_NOTIF', {
                    type: 'danger',
                    text: data
                })
                if(status == 404){
                    cookies.remove('hospital-user')
                    cookies.remove('hospital-token')
                    commit('SET_LAYOUT', 'auth')
                }
                // console.clear()
            })
        },
    }
}