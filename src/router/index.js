import Vue from 'vue'
import Router from 'vue-router'
import index from '@/views'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    linkActiveClass: 'is-active',
    scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 }
    },
    routes: [{
        path: '/',
        name: 'index',
        component: index,
        children: [{
            path: '/personal',
            name: 'personal',
            component(resolve) {
                require(['@/views/navClassify/personal'], resolve)
            },
        }, {
            path: '/bank',
            name: 'bank',
            component(resolve) {
                require(['@/views/navClassify/bank'], resolve)
            },
        }, {
            path: '/bonus',
            name: 'bonus',
            component(resolve) {
                require(['@/views/navClassify/bonus'], resolve)
            },
        }, {
            path: '/integral',
            name: 'integral',
            component(resolve) {
                require(['@/views/navClassify/integral'], resolve)
            },
        }, {
            path: '/gameHistory',
            name: 'gameHistory',
            component(resolve) {
                require(['@/views/navClassify/gameHistory'], resolve)
            },
        }, {
            path: '/mail',
            name: 'mail',
            component(resolve) {
                require(['@/views/navClassify/mail'], resolve)
            },
        }]
    }, {
        path: '/playGame',
        name: 'playGame',
        component(resolve) {
            require(['@/views/playGame'], resolve)
        },
        children: [{
            path: '/gBank',
            name: 'gBank',
            component(resolve) {
                require(['@/views/gamePerson/bank'], resolve)
            },
        }, {
            path: '/gHistory',
            name: 'gHistory',
            component(resolve) {
                require(['@/views/gamePerson/gameHistory'], resolve)
            },
        }, {
            path: '/gAccount',
            name: 'gAccount',
            component(resolve) {
                require(['@/views/gamePerson/account'], resolve)
            },
        }]
    }, {
        path: '/helps',
        name: 'helps',
        component(resolve) {
            require(['@/views/helps'], resolve)
        },
        children: [{
            path: '/helpCenter',
            name: 'helpCenter',
            component(resolve) {
                require(['@/views/helps/helpCenter'], resolve)
            },
            meta: {
                ifNoNeedLogin: true
            }
        }, {
            path: '/about',
            name: 'about',
            component(resolve) {
                require(['@/views/helps/about'], resolve)
            },
            meta: {
                ifNoNeedLogin: true
            }
        }, {
            path: '/privacy',
            name: 'privacy',
            component(resolve) {
                require(['@/views/helps/privacy'], resolve)
            },
            meta: {
                ifNoNeedLogin: true
            }
        }, {
            path: '/response',
            name: 'response',
            component(resolve) {
                require(['@/views/helps/response'], resolve)
            },
            meta: {
                ifNoNeedLogin: true
            }
        }]
    }, {
        path: '/agent',
        name: 'agent',
        component(resolve) {
            require(['@/views/agentPage'], resolve)
        },
        meta: {
            needAgent: true,
        },
        children: [{
            path: '/aMsg',
            name: 'aMsg',
            component(resolve) {
                require(['@/views/agentPage/personal'], resolve)
            },
        },{
            path: '/aVip',
            name: 'aVip',
            component(resolve) {
                require(['@/views/agentPage/vips'], resolve)
            },
        },{
            path: '/aBonus',
            name: 'aBonus',
            component(resolve) {
                require(['@/views/agentPage/bonus'], resolve)
            },
        },{
            path: '/aExtent',
            name: 'aExtent',
            component(resolve) {
                require(['@/views/agentPage/extent'], resolve)
            },
        },]
    }]
})

router.beforeEach((to, from, next) => {
    if (to.matched.some(record => record.meta.ifNoNeedLogin)) {
        next();
        return false;
    }
    if (to.matched.some(record => record.meta.needAgent)) {
        if (localStorage.getItem('agentToken') || sessionStorage.getItem('agentToken')) {
            next();
        } else {
            next({
                path: '/',
            })
        }
        return false;
    }
    if (to.path != '/') {
        if (localStorage.getItem('token') || sessionStorage.getItem('token')) {
            next();
        } else {
            next({
                path: '/',
            })
        }
    } else {
        next();
    }
})

export default router