<template>
  <form @submit.prevent>
    <h4>Create post</h4>
    <my-input
      v-focus
      v-model="post.title"
      type="text"
      placeholder="Название"
    />
    <my-input
      v-model="post.body"
      type="text"
      placeholder="Описание"
    />
    <my-button @click="createPost">Создать</my-button>
  </form>
</template>

<script>

export default {

  data() {
    return {
      post: {
        title: "",
        body: "",
      },
    };
  },

  methods: {
    createPost() {
      this.post.id = Date.now();
      //связка дочернего с род. компонентом через emit('название события', аргументы, попадающие в род. функцию после того как на нее подпишется родительский компонент)
      this.$emit("create_post", this.post);
      this.post = {
        title: "",
        body: "",
      };
    },

    titleValue(e) {
      this.post.title = e.target.value;
    },

    bodyValue(e) {
      this.post.body = e.target.value;
    },
  },

//   watch: {
//       post: {
//           handler(bb) {
//               console.log(bb)
//           },
//           deep: true
//       }
//   }
};
</script>

<style scoped>
form {
  display: flex;
  flex-direction: column;
}

.btn {
  margin-top: 15px;
  align-self: flex-end;
  padding: 10px 15px;
  background: none;
  color: teal;
  border: 1px solid teal;
}
</style>