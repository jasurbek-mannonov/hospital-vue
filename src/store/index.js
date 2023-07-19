import http from "../utils/http";

import { createStore } from "vuex";
import { modules } from "./main/modules";

export const store = createStore({
    state: () => ({
        url: http
    }),
    getters: {
        mainUrl(state){
            return state.url
        }
    },
    modules,  
})