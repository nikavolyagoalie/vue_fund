import axios from 'axios'
import { onMounted, ref } from 'vue'

export function usePosts(limit) {
    //реактивные переменные
    const posts = ref([])
    const isPostsLoading = ref(true)
    const totalPages = ref(0)

    //логика по работе с переменными вышеуказанными
    const fetching = async () => {
        try {
            const res = await axios.get(
                `https://jsonplaceholder.typicode.com/posts`,
                {
                    params: {
                        _page: 1,
                        _limit: limit,
                    },
                }
            );
            totalPages.value = Math.ceil(
                res.headers["x-total-count"] / limit
            );
            posts.value = res.data;
            isPostsLoading.value = false;
        } catch (e) {
            console.log(e);
        } finally {
            isPostsLoading.value = false
        }
    }

    onMounted(fetching)

    return {
        posts, isPostsLoading, totalPages
    }
}