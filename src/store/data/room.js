import { convertDate } from "../../helpers/infunc"

export const room = {
    state: () => ({
        rooms: [],
        room: {},
        countRoom: 0
    }),
    getters: {
        rooms({rooms}){
            return rooms
        },
        room({room}){
            return room
        },
        countRoom({countRoom}){
            return countRoom
        },
        activeRooms({rooms}){
            return rooms.filter(room => room.status == 0)
        }
    },   
    mutations: {
        SET_ROOMS(state, payload){
            state.rooms = [...payload.map(item => {
                item.createdTime = convertDate(item.createdTime)
                return item
            })]
        },
        NEW_ROOM(state, payload){
            state.rooms = [{...payload, createdTime:convertDate(payload.createdTime)}, ...state.rooms]
        },
        UPDATE_ROOM(state, payload){
            state.rooms = state.rooms.map(room => {
                if(room._id == payload._id) 
                    return {...payload, createdTime:convertDate(payload.createdTime)}
                return room
            })
        },
        DELETE_ROOM(state, payload){
            state.rooms = state.rooms.filter(room => {
                if(room._id == payload) return false
                return room
            })
        }
    },
    actions: {
        async getAllRooms({dispatch, commit}){
            let res = await dispatch('getAxios', 'room') 
            if(res.status == 200){
                commit('SET_ROOMS', res.data)
            }
        },
        async addRoom({dispatch, commit},payload){
            let res = await dispatch('postAxios', {
                url: `room`,
                data: payload
            })
            if(res.status == 201){
                commit('NEW_ROOM', res.data)
                commit('SET_NOTIF', {
                    type: 'success',
                    text: "Yangi xona qo'shildi!"
                })
            }
        },
        async deleteRoom({dispatch, commit}, payload){
            let res = await dispatch('deleteAxios', `room/${payload}`)
            if(res.status == 200){
                commit('DELETE_ROOM', payload)
                commit('SET_NOTIF', {
                    type: 'warning',
                    text: "Xona o'chirildi!"
                })
            }
        },
        async getRoom({dispatch}, payload){
            return await dispatch('getAxios', `room/${payload}`)
        },
        async saveRoom({dispatch, commit}, payload){
            let res = await dispatch('putAxios', {
                url: 'room',
                data: payload
            })
            if(res.status == 200){
                commit('UPDATE_ROOM', res.data)
                  commit('SET_NOTIF', {
                    type: 'warning',
                    text: "Ma'lumot yangilandi!"
                })
            }        
        }
    }
}