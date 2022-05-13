<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input 
      model-value="searchQuery"
      @update:model-value="setSearchQuery"  
      placeholder="Search..." 
      v-focus
    />
    <div class="app__btns">
      <my-button @click="showDialog" style="margin: 15px 0"
        >Создать пост</my-button
      >
      <my-select 
      model-value="selectedSort"
      @update:model-value="setSelectedSort"  
      :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create_post="createPost"></post-form>
    </my-dialog>
    <div class="page__wrapper">
      <div
        v-for="pageNumber in totalPages"
        :key="pageNumber"
        class="page"
        :class="{ 'current-page': page === pageNumber }"
        @click="changePage(pageNumber)"
      >
        {{ pageNumber }}
      </div>
    </div>
    <post-list
      @delete="deletePost"
      :posts="sortedAndSearchedPosts"
      v-if="!isPostsLoading"
    ></post-list>
    <div v-else>Loading...</div>

    <!-- Блок для отлова пролистывания конца страницы-->
    <!-- Прямой доступ к div(через ref)-->
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";
import { mapState, mapGetters, mapMutations, mapActions } from "vuex";

import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
  },
  data() {
    return {
      dialogVisible: false,
    };
  },

  methods: {
    ...mapMutations({
      setPage: "post/setPage",
      setSearchQuery: "post/setSearchQuery",
      setSelectedSort: "post/setSelectedSort",
    }),

    ...mapActions({
      loadMorePosts: "post/loadMorePosts",
      fetchPosts: "post/fetchPosts",
    }),

    //пришло от дочернего и принимает парамером объект post, который мы передали
    createPost(post) {
      this.posts.push(post);
      this.dialogVisible = false;
    },

    deletePost(post) {
      this.posts = this.posts.filter((p) => p.id !== post.id);
    },

    showDialog() {
      this.dialogVisible = true;
    },

   
  },

  mounted() {
    this.fetchPosts();
    
  },

  watch: {

  },

  computed: {

    ...mapState({
      posts: state => state.post.posts,
      isPostsLoading: state => state.post.isPostsLoading,
      selectedSort: state => state.post.selectedSort,
      searchQuery: state => state.post.searchQuery,
      page: state => state.post.page,
      limit: state => state.post.limit,
      totalPages: state => state.post.totalPages,
      sortOptions: state => state.post.sortOptions,
    }),

    ...mapGetters({
      sortedPosts: "post/sortedPosts",
      sortedAndSearchedPosts: "post/sortedAndSearchedPosts",
    }),
  },
};
</script>

<style>
.app__btns {
  margin: 15px 0;
  display: flex;
  justify-content: space-between;
}

.page__wrapper {
  display: flex;
  margin-top: 15px;
}

.page {
  border: 1px solid black;
  padding: 10px;
}

.current-page {
  border: 1px solid teal;
}

.observer {
  height: 30px;
  background: blue;
}
</style>