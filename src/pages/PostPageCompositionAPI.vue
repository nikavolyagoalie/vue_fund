<template>
  <div>
    <h1>Страница с постами</h1>
    <my-input v-model="searchQuery" placeholder="Search..." v-focus/>
    <div class="app__btns">
      <my-button @click="showDialog" style="margin: 15px 0"
        >Создать пост</my-button
      >
      <my-select v-model="selectedSort" :options="sortOptions" />
    </div>
    <my-dialog v-model:show="dialogVisible">
      <post-form @create_post="createPost"></post-form>
    </my-dialog>
    <post-list
      @delete="deletePost"
      :posts="sortedAndSearchedPosts"
      v-if="!isPostsLoading"
    ></post-list>
    <div v-else>Loading...</div>

    <!--Блок для отлова пролистывания конца страницы -->
    <!-- Прямой доступ к div(через ref) -->
    <div v-intersection="loadMorePosts" class="observer"></div>
  </div>
</template>

<script>
import PostForm from "@/components/PostForm";
import PostList from "@/components/PostList";
import MyDialog from "@/components/UI/MyDialog";

import axios from "axios";

import {ref} from 'vue'


export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
  },
  data() {
    return {
      dialogVisible: false,
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],
    };
  },

  setup(props) {
    const {posts, totalPages, isPostsLoading} = usePosts(10)
    const {selectedSort, sortedPosts} = useSortedPosts(posts)
    const {searchQuery, sortedAndSearchedPosts} = useSortedAndSearchedPosts(sortedPosts)

    return {
      posts, totalPages, isPostsLoading, selectedSort, sortedPosts, searchQuery, sortedAndSearchedPosts
    }
  }
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