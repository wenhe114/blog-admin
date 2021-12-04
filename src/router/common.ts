import { createRouter, createWebHistory, RouteRecordRaw } from "vue-router";
const routers:Array<RouteRecordRaw>=[
    {
        path:"/",
        name:"登录",
        component:()=>import("@/views/login.vue")
    },
    {
        path:"/:pathMatch(.*)*",
        name: "NotFound",
        component:()=>import("@/views/404.vue")
    }
]

export default routers