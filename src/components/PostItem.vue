<template>
  <div class="post">
    <div>
      <div>{{ post.id }}</div>
      <div><strong>Название </strong>{{ post.title }}</div>
      <div><strong>Описание </strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="deletePost">Удалить</my-button>
      <my-button @click="$router.push(`posts/${post.id}`)">Открыть</my-button>
    </div>
  </div>
</template>

<script>

export default {

  props: {
    //в дочернем компоненты пропсы нельзя менять
    post: {
      type: Object,
      required: true,
    },
  },

  methods: {
    deletePost() {
      this.$emit('delete', this.post)
    }
  }
};
</script>

<style scoped>
.post {
  padding: 15px;
  border: 3px solid green;
  margin: 15px 0;
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.post__btns {
  display: flex;
}
</style>