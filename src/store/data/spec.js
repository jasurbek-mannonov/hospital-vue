import { convertDate } from "../../helpers/infunc"

export const spec = {
    state: () => ({
        specs: [],
        spec: {},
        countSpec: 0
    }),
    getters: {
        specs({specs}){
            return specs
        },
        spec({spec}){
            return spec
        },
        countSpec({countSpec}){
            return countSpec
        },
        activeSpecs({specs}){
            return specs.filter(spec => spec.status == 0)
        }
    },   
    mutations: {
        SET_SPECS(state, payload){
            state.specs = [...payload.map(item => {
                item.createdTime = convertDate(item.createdTime)
                return item
            })]
        },
        NEW_SPEC(state, payload){
            state.specs = [{...payload, createdTime:convertDate(payload.createdTime)}, ...state.specs]
        },
        UPDATE_SPEC(state, payload){
            state.specs = state.specs.map(spec => {
                if(spec._id == payload._id) 
                    return {...payload, createdTime:convertDate(payload.createdTime)}
                return spec
            })
        },
        DELETE_SPEC(state, payload){
            state.specs = state.specs.filter(spec => {
                if(spec._id == payload) return false
                return spec
            })
        }
    },
    actions: {
        async getAllSpecs({dispatch, commit}){
            let res = await dispatch('getAxios', 'spec') 
            if(res.status == 200){
                commit('SET_SPECS', res.data)
            }
        },
        async addSpec({dispatch, commit},payload){
            let res = await dispatch('postAxios', {
                url: `spec`,
                data: payload
            })
            if(res.status == 201){
                commit('NEW_SPEC', res.data)
                commit('SET_NOTIF', {
                    type: 'success',
                    text: "Yangi mutaxassislik qo'shildi!"
                })
            }
        },
        async deleteSpec({dispatch, commit}, payload){
            let res = await dispatch('deleteAxios', `spec/${payload}`)
            if(res.status == 200){
                commit('DELETE_SPEC', payload)
                commit('SET_NOTIF', {
                    type: 'warning',
                    text: "Bo'lim o'chirildi!"
                })
            }
        },
        async getSpec({dispatch}, payload){
            return await dispatch('getAxios', `spec/${payload}`)
        },
        async saveSpec({dispatch, commit}, payload){
            let res = await dispatch('putAxios', {
                url: 'spec',
                data: payload
            })
            if(res.status == 200){
                commit('UPDATE_SPEC', res.data)
                  commit('SET_NOTIF', {
                    type: 'warning',
                    text: "Ma'lumot yangilandi!"
                })
            }        
        }
    }
}