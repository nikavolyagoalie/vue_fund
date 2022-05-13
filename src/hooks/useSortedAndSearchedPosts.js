import { computed, ref } from 'vue'

export function useSortedAndSearchedPosts(sortedPosts) {
    const searchQuery = ref('')

    const sortedAndSearchedPosts = computed(() => {
        return sortedPosts.value.filter((p) =>
            p.title.toLowerCase().includes(searchQuery.value.toLowerCase())
        );
    })

    return {
        searchQuery, sortedAndSearchedPosts
    }
}
