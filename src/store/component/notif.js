export const notif = {
    state: () => ({
        notif:{}
    }),
    getters: {
        notif({notif}){
            return notif
        }
    },
    mutations:{
        SET_NOTIF(state, payload){
            state.notif = payload
            setTimeout(() => {
                state.notif = {}
            }, 1200)
        }
    }
}