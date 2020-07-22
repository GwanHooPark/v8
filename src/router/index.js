import Vue from "vue";
import VueRouter from "vue-router";
import V8Slide from "../views/v8-slide.vue";
import V8SlideSub from "../views/v8-slide-subtitle.vue";

Vue.use(VueRouter);

const routes = [
    {
        path: "/",
        name: "V8Slide",
        component: V8Slide
    },
    {
        path: "/sub",
        name: "V8SlideSub",
        component: V8SlideSub
    }
];

const router = new VueRouter({
    mode: "history",
    base: process.env.BASE_URL,
    routes
});

export default router;