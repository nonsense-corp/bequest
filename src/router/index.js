import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Qr from '@/components/Qr'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Tips from '@/components/Tips'
import Balances from '@/components/Balances'
import Withdraw from '@/components/Withdraw'

Vue.use(Router)

export default new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
        },
        {
            path: '/register',
            name: 'register',
            component: Register,
        },
        {
            path: '/login',
            name: 'Login',
            component: Login,
        },
        {
            path: '/embeds',
            name: 'Qr',
            component: Qr,
        },
        {
            path: '/tips',
            name: 'Tips',
            component: Tips
        },
        {
            path: '/balances',
            name: 'Balances',
            component: Balances,
        },
        {
            path: '/withdraw',
            name: 'Withdraw',
            component: Withdraw,
        },
    ]
})
