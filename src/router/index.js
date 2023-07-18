import { createRouter, createWebHistory} from "vue-router";


const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            name: 'home',
            component: () => import('../views/HomeView.vue')
        },
        {
            path: '/about',
            name: 'about',
            component: () => import('../views/AboutView.vue')
        },
        {
            path: '/department',
            name: 'department',
            component: () => import('../views/department.vue')
        },
        {
            path: "/posts",
            name: 'posts',
            component: () => import('../views/posts.vue')
        },
        {
            path: "/create-post",
            name: 'create-post',
            component: () => import('../views/create-post.vue')
        },
    ]
})

export default router