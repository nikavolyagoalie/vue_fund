
export const PostModule = {
    state: () => ({
        posts: [],
        sortOptions: [
            { value: "title", name: "По названию" },
            { value: "body", name: "По содержимому" },
        ],
        isPostsLoading: false,
        searchQuery: "",
        selectedSort: "",
        //страница(номер)
        page: 1,
        //ограничение постов на странице
        limit: 10,
        //общее кол-во страниц
        totalPages: 0,
    }),

    getters: {
        sortedPosts(state) {
            return [...state.posts].sort((post1, post2) => {
                return post1[state.selectedSort]?.localeCompare(
                    post2[state.selectedSort]
                );
            });
        },

        sortedAndSearchedPosts(state, getters) {
            return getters.sortedPosts.filter((p) =>
                p.title.toLowerCase().includes(state.searchQuery.toLowerCase())
            );
        },
    },

    mutations: {
        setPosts(state, posts) {
            state.posts = posts
        },

        setLoading(state, bool) {
            state.isPostsLoading = bool
        },

        setPage(state, page) {
            state.page = page
        },

        setSelectedSort(state, selectedSort) {
            state.selectedSort = selectedSort
        },

        setTotalPages(state, totalPages) {
            state.totalPages = totalPages
        },

        setSearchQuery(state, searchQuery) {
            state.searchQuery = searchQuery
        },
    },

    actions: {
        //список с сервера
        async fetchPosts({state, commit}) {
            try {
                // this.isPostsLoading = true;
                commit('setLoading', true)
                setTimeout(async () => {
                    const res = await axios.get(
                        `https://jsonplaceholder.typicode.com/posts`,
                        {
                            params: {
                                _page: state.page,
                                _limit: state.limit,
                            },
                        }
                    );
                    // this.totalPages = Math.ceil(
                    //     res.headers["x-total-count"] / state.limit
                    // );
                    commit('setTotalPage', Math.ceil(res.headers["x-total-count"] / state.limit))
                    // state.posts = res.data;
                    commit('setPosts', res.data)
                    console.log(res);
                }, 1200);
            } catch (e) {
                console.log(e);
            } finally {
                commit('setLoading', false)
            }
        },

        async loadMorePosts() {
            try {
                // this.page += 1
                commit('setPage', state.page + 1)
                // this.isPostsLoading = true;
                setTimeout(async () => {
                    const res = await axios.get(
                        `https://jsonplaceholder.typicode.com/posts`,
                        {
                            params: {
                                _page: state.page,
                                _limit: state.limit,
                            },
                        }
                    );
                    // this.totalPages = Math.ceil(
                    //     res.headers["x-total-count"] / this.limit
                    // );
                    commit('setTotalPages', Math.ceil(res.headers["x-total-count"] / state.limit))
                    commit('setPosts', [...state.posts, ...res.data])
                    // this.posts = [...state.posts, ...res.data];
                }, 1200);
            } catch (e) {
                console.log(e);
            }
        },
    },
    namespaced: true
}