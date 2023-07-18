import axios from "axios"

export const helpers = {
    actions: {
        async getAxios({getters}, payload){
            return await axios.get(`${getters.mainUrl}/${payload}`, {
                headers: {
                    'authorization': `Bearer ${getters.token}`
                }
            })
        },

        async postAxios({getters, commit}, payload){
            return await axios.post(`${getters.mainUrl}/${payload.url}`, payload.data).catch(e => {
                let {data} = e.response
                commit('SET_NOTIF', {
                    type: 'danger',
                    text: data
                })
                console.clear()
            })
        }
    }
}