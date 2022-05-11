<template>
  <post-item
    :post="post"
    class="post"
    v-for="(post, idx) of posts"
    :key="idx"
    :id="post.id"
  ></post-item>
</template>

<script>
import PostItem from "@/components/PostItem";

export default {
  components: {
    PostItem,
  },
  props: {
    //в дочернем компоненты пропсы нельзя менять
    posts: {
      type: Array,
      required: true,
    },
  },
};
</script>

<style scoped>

</style>