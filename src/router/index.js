import { createRouter, createWebHistory} from "vue-router";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/department',
            name: 'department',
            component: () => import('../views/department.vue')
        },
        {
            path: "/create-post",
            name: 'create-post',
            component: () => import('../views/create-post.vue')
        },
    ]
})

export default router