import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        name: 'user',
        path: '/user',
        component: () =>
            import ('@/views/user')
    },
    {
        name: 'live',
        path: '/live',
        component: () =>
            import ('@/views/live')
    },
    {
        name: 'community',
        path: '/community',
        component: () =>
            import ('@/views/community')
    },
    {
        name: 'course',
        path: '/course',
        component: () =>
            import ('@/views/course')
    },
    {
        name: 'homework',
        path: '/homework',
        component: () =>
            import ('@/views/homework')
    },
    {
        name: 'live_open',
        path: '/live/:videoId',
        component: () =>
            import ('@/views/liveOpen')
    },
    {
        name: 'course_open',
        path: '/course/:courseId',
        component: () =>
            import ('@/views/courseOpen')
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router