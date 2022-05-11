<template>
  <div class="app">
    <post-form @create_post="createPost"></post-form>
    <post-list :posts="posts" ></post-list>
  </div>
</template>

<script>
import PostForm from '@/components/PostForm'
import PostList from '@/components/PostList'

export default {
  components: {
      PostForm, PostList
  },  
  data() {
    return {
      posts: [
        { id: 1, title: "etewtw", body: "gfdgsdfsdf" },
        { id: 2, title: "sdfsweetewtw", body: "qweqwsdfsdf" },
        { id: 3, title: "reetewtw", body: "gfdfhsdfsdf" },
        { id: 4, title: "ewetwetewtw", body: "dfhdfsdfsdf" },
        { id: 5, title: "qweqwetewtw", body: "dfhdfhsdfsdf" },
      ],
    };
  },

  methods: {
      //пришло от дочернего и принимает парамером объект post, который мы передали
      createPost(post) {
          this.posts.push(post)
      },
  }
};
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.app {
    padding: 20px;
}
</style>