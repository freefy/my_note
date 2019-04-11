import Vue from 'vue'
import Router from 'vue-router'
// 这里如果里面是index.vue 写了会报错
import Login from '@/pages/login.vue'
import ContentPage from '@/pages/contentPage.vue'
import Register from '@/pages/register.vue'


Vue.use(Router)

const router = new Router({
  mode: 'history', //去掉井号
  routes: [{
      path: '/',
      redirect: "",
      name: 'login',
      component: Login,
      children: [{
          path: '/login',
          name: 'forgetCode',
          component: Login,
        },
        {
          path: '/login',
          name: 'suggest',
          component: Login,
        }
      ]
    },
    {
      path: '/register',
      name: 'register',
      component: Register,
    },
    {
      path: '/content',
      name: 'content',
      component: ContentPage,
      children: [{
          path: '/content/addEdit',
          name: 'addEdit',
          component: resolve => {
            require(['@/components/lists/addEdit.vue'], resolve)
          },
        },
        // {
        //   path: '/content/openFolder',
        //   name: 'openFolder',
        //   component: resolve => {
        //     require(['@/components/content/openFolder.vue'], resolve)
        //   },
        // },
        {
          path: '/content/myshare',
          name: 'myshare',
          component: resolve => {
            require(['@/components/lists/myshare.vue'], resolve)
          },
        }, {
          path: '/content/shareList',
          name: 'shareList',
          component: resolve => {
            require(['@/components/lists/shareList.vue'], resolve)
          },
        }, {
          path: '/content/notes',
          name: 'notes',
          component: resolve => {
            require(['@/components/lists/notes.vue'], resolve)
          },
          children: [{
              path: '/content/notes/openFile',
              name: 'openFile',
              component: resolve => {
                require(['@/components/content/openFile.vue'], resolve)
              },
            },
            {
              path: '/content/openFolder:item?',
              name: 'openFolder',
              component: resolve => {
                require(['@/components/content/openFolder.vue'], resolve)
              },
            },
          ]
        }, {
          path: '/content/partner',
          name: 'partner',
          component: resolve => {
            require(['@/components/lists/notePartner.vue'], resolve)
          },
        },
        {
          path: '/content/myFiles',
          name: 'myFiles',
          component: resolve => {
            require(['@/components/lists/myFiles.vue'], resolve)
          }
        },
        {
          path: '/content/recover',
          name: 'recover',
          component: resolve => {
            require(['@/components/lists/recover.vue'], resolve)
          },
        },


      ]
    }
  ]
})

export default router
