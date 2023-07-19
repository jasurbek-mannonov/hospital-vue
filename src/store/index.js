
import { createStore } from "vuex";
import { modules } from "./main/modules";

export const store = createStore({
    state: () => ({
        url: import.meta.env.VITE_APP_API_URL
    }),
    getters: {
        mainUrl(state){
            return state.url
        }
    },
    modules,  
})