import { createRouter, createWebHistory, RouteRecordRaw,createWebHashHistory } from "vue-router";
import layout from "@/views/layout/main.vue"
import index from "@/views/index.vue"
import commonRouters from "./common"
const adminRoutes: Array<RouteRecordRaw> = [
  {
    path: "/admin",
    name: "admin",
    component: layout,
    children: [
      {
        path: "",
        name: "index",
        component: index
      },
      {
        path: "content",
        name: "content",
        component: () => import("../views/content/content.vue")
      },
      {
        path: "content/add",
        name: "add",
        component: () => import("../views/content/add.vue")
      },
      {
        path: "menu/add",
        name: "add-menu",
        component: () => import("../views/menu/addMenu.vue")
      },
      {
        path: "menu/list",
        name: "menu-list",
        component: () => import("../views/menu/menuList.vue")
      },
      {
        path: "icon/list",
        name: "icon-list",
        component: () => import("../views/icon/list.vue")
      },
      {
        path: "about",
        name: "about",
        component: () => import("../views/about/about.vue")
      },
      {
        path: "resource",
        name: "resource",
        component: () => import("../views/resource/list.vue")
      }
    ]
  },
];

const routes: Array<RouteRecordRaw> = [...commonRouters,...adminRoutes]
console.log(routes,adminRoutes);

const router = createRouter({
  // history: createWebHistory(process.env.BASE_URL),
  history:createWebHashHistory(),
  routes
});
// const router = createRouter({
//   history: createWebHistory(process.env.BASE_URL),
//   route
// });

export default router;
