<template>
  <div v-show="posts.length">
    <h3>Список постов</h3>
    <transition-group name="post-list">
      <post-item
        :post="post"
        class="post"
        v-for="(post, idx) of posts"
        :key="idx"
        :id="post.id"
        @delete="$emit('delete', post)"
      ></post-item>
    </transition-group>
  </div>
  <div v-show="posts.length === 0" style="color: red">
    <h4>Нет постов</h4>
  </div>
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
.post-list-item {
  display: inline-block;
  margin-right: 10px;
}
.post-list-enter-active,
.post-list-leave-active {
  transition: all 1s ease;
}
.post-list-enter-from,
.post-list-leave-to {
  opacity: 0;
  transform: translateY(30px);
}
</style>