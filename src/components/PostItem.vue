<template>
  <div class="post">
    <div>
      <div><strong>Название </strong>{{ post.title }}</div>
      <div><strong>Описание </strong>{{ post.body }}</div>
    </div>
    <div class="post__btns">
      <my-button @click="deletePost">Удалить</my-button>
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
</style>