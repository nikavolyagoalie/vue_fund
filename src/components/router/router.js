import Main from '@/pages/Main.vue'
import PostPage from '@/pages/PostPage.vue'
import PostPageWithStore from '@/pages/PostPageWithStore.vue'
import PostPageCompositionAPI from '@/pages/PostPageCompositionAPI.vue'
import CurrentPostPage from '@/pages/CurrentPostPage.vue'
import { createRouter, createWebHistory } from 'vue-router'

const routes = [
    {
        path: '/',
        component: Main
    },

    {
        path: '/posts',
        component: PostPage
    },

    {
        path: '/posts/:id',
        component: CurrentPostPage
    },

    {
        path: '/store',
        component: PostPageWithStore
    },

    {
        path: '/composition',
        component: PostPageCompositionAPI
    }
]


const router = createRouter({
    routes,
    history: createWebHistory(process.env.BASE_URL)
})

export default router