export const layout = {
    state: () => ({
        layout: 'auth'
    }),
    getters: {
        layout({layout}){
            return layout
        }
    },
    mutations: {
        SET_LAYOUT(state, payload){
            state.payload = payload
        }
    },
}