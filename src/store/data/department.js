import { convertDate } from "../../helpers/infunc"

export const department = {
    state: () => ({
        departments: [],
        department: {},
        countDepartment: 0
    }),
    getters: {
        departments({departments}){
            return departments
        },
        department({department}){
            return department
        },
        countDepartment({countDepartment}){
            return countDepartment
        },
        activeDepartments({departments}){
            return departments.filter(department => department.status == 0)
        }
    },   
    mutations: {
        SET_DEPARTMENTS(state, payload){
            state.departments = [...payload.map(item => {
                item.createdTime = convertDate(item.createdTime)
                return item
            })]
        },
        NEW_DEPARTMENT(state, payload){
            state.departments = [{...payload, createdTime:convertDate(payload.createdTime)}, ...state.departments]
        },
        UPDATE_DEPARTMENT(state, payload){
            state.departments = state.departments.map(department => {
                if(department._id == payload._id) 
                    return {...payload, createdTime:convertDate(payload.createdTime)}
                return department
            })
        },
        DELETE_DEPARTMENT(state, payload){
            state.departments = state.departments.filter(department => {
                if(department._id == payload) return false
                return department
            })
        }
    },
    actions: {
        async getAllDepartments({dispatch, commit}){
            let res = await dispatch('getAxios', 'department') 
            if(res.status == 200){
                commit('SET_DEPARTMENTS', res.data)
            }
        },
        async addDepartment({dispatch, commit},payload){
            let res = await dispatch('postAxios', {
                url: `department`,
                data: payload
            })
            if(res.status == 201){
                commit('NEW_DEPARTMENT', res.data)
                commit('SET_NOTIF', {
                    type: 'success',
                    text: "Yangi bo'lim qo'shildi!"
                })
            }
        },
        async deleteDepartment({dispatch, commit}, payload){
            let res = await dispatch('deleteAxios', `department/${payload}`)
            if(res.status == 200){
                commit('DELETE_DEPARTMENT', payload)
                commit('SET_NOTIF', {
                    type: 'warning',
                    text: "Bo'lim o'chirildi!"
                })
            }
        },
        async getDepartment({dispatch}, payload){
            return await dispatch('getAxios', `department/${payload}`)
        },
        async saveDepartment({dispatch, commit}, payload){
            let res = await dispatch('putAxios', {
                url: 'department',
                data: payload
            })
            if(res.status == 200){
                commit('UPDATE_DEPARTMENT', res.data)
                  commit('SET_NOTIF', {
                    type: 'warning',
                    text: "Ma'lumot yangilandi!"
                })
            }        
        }
    }
}