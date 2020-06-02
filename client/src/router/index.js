import Vue from "vue"
import VueRouter from "vue-router"
import Home from "../views/Home.vue"

Vue.use(VueRouter)

const routes = [
    {
        path: "/",
        name: "home",
        component: Home
    },
    {
        path: "/konto/neuer-eintrag",
        name: "neuer-eintrag",
        component: () => import('../views/Konto/Neuer-Eintrag.vue')
    }
]

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
})

export default router
