import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueSocketIO from 'vue-socket.io'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
import axios from 'axios'
import video from 'video.js/dist/video'
import 'video.js/dist/video-js.css'


Vue.prototype.$video = video


Vue.use(new VueSocketIO({
    debug: true,
    connection: ''
}))
Vue.prototype.$axios = axios

Vue.use(ElementUI)
    // Vue.use(new vueSocketIO({
    //     debug: true,
    //     connection: '/'
    // }))
Vue.config.productionTip = false

new Vue({
    router,
    store,
    axios,
    render: h => h(App)
}).$mount('#app')