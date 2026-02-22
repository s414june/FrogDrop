// src/router/routes.ts
import type { RouteRecordRaw } from 'vue-router'

export const routes: RouteRecordRaw[] = [
    {
        path: '/',
        name: 'home',
        component: () => import('../pages/HomePage.vue'),
    },
    {
        path: '/send',
        name: 'send',
        component: () => import('../pages/SendPage.vue'),
    },
    {
        path: '/receive',
        name: 'receive',
        component: () => import('../pages/ReceivePage.vue'),
    },
    // {
    //     path: '/room/:code?',
    //     name: 'room',
    //     component: () => import('../pages/RoomPage.vue'),
    // },
]
