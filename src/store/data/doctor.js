import { convertDate } from "../../helpers/infunc"

export const doctor = {
    state: () => ({
        doctors: [],
        doctor: {},
        countDoctor: 0,
        doctorToggle: false,
        editDoctorToggle: true
    }),
    getters: {
        doctorToggle: ({doctorToggle}) => doctorToggle,
        editDoctorToggle: ({editDoctorToggle}) => editDoctorToggle,
        doctors({doctor}){
            return doctor
        },
        doctor({doctor}){
            return doctor
        },
        countDoctor({countDoctor}){
            return countDoctor
        },
        activeDoctors({doctors}){
            return doctors.filter(doctor => doctor.status == 0)
        }
    },   
    mutations: {
        SET_DOCTOR_TOGGLE(state,payload){
            state.doctorToggle = payload
        },
        SET_EDIT_DOCTOR_TOGGLE(state,payload){
            state.editDoctorToggle = payload
        },
        SET_DOCTORS(state, payload){
            state.doctors = [...payload.map(item => {
                item.createdTime = convertDate(item.createdTime)
                return item
            })]
        },
        NEW_DOCTOR(state, payload){
            state.doctors = [{...payload, createdTime:convertDate(payload.createdTime)}, ...state.doctors]
        },
        UPDATE_DOCTOR(state, payload){
            state.doctors = state.doctors.map(doctor => {
                if(doctor._id == payload._id) 
                    return {...payload, createdTime:convertDate(payload.createdTime)}
                return doctor
            })
        },
        DELETE_DOCTOR(state, payload){
            state.doctors = state.doctors.filter(doctor => {
                if(doctor._id == payload) return false
                return doctor
            })
        }
    },
    actions: {
        async getAllDoctors({dispatch, commit}){
            let res = await dispatch('getAxios', 'doctor') 
            if(res.status == 200){
                commit('SET_DOCTORS', res.data)
            }
        },
        async addDoctor({dispatch, commit},payload){
            let res = await dispatch('postAxios', {
                url: `doctor`,
                data: payload
            })
            if(res.status == 201){
                commit('NEW_DOCTOR', res.data)
                commit('SET_NOTIF', {
                    type: 'success',
                    text: "Yangi doktor qo'shildi!"
                })
            }
        },
        async deleteDoctor({dispatch, commit}, payload){
            let res = await dispatch('deleteAxios', `doctor/${payload}`)
            if(res.status == 200){
                commit('DELETE_DOCTOR', payload)
                commit('SET_NOTIF', {
                    type: 'warning',
                    text: "Doktor o'chirildi!"
                })
            }
        },
        async getDoctor({dispatch}, payload){
            return await dispatch('getAxios', `doctor/${payload}`)
        },
        async saveDoctor({dispatch, commit}, payload){
            let res = await dispatch('putAxios', {
                url: 'doctor',
                data: payload
            })
            if(res.status == 200){
                commit('UPDATE_DOCTOR', res.data)
                  commit('SET_NOTIF', {
                    type: 'warning',
                    text: "Ma'lumot yangilandi!"
                })
            }        
        }
    }
}