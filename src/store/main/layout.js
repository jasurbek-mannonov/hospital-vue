export const layout = {
    state: () => ({
        layout: 'def'
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