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
                console.log(res.data)
                commit('SET_DEPARTMENTS', res.data)
            }
        }
    }
}