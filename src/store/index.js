import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        isLogin: true,
        user: {
            name: '',
            id: 1,
            phone: '',
            email: '',
            status: 'student',
            avatar: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1591717451070&di=4e036320691f841f4ce0f1c4557c1903&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fitem%2F201806%2F13%2F20180613145443_eETcL.thumb.700_0.jpeg',
            collect: [{
                name: '',
                src: '',
                id: ''
            }]
        }
    },
    mutations: {},
    actions: {},
    modules: {}
})