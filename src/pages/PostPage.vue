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
    <!-- <div class="page__wrapper">
      <div v-for="pageNumber in totalPages" :key="pageNumber" class="page" :class="{'current-page': page === pageNumber }" @click="changePage(pageNumber)">
        {{ pageNumber }}
      </div>
    </div> -->
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

import axios from "axios";

export default {
  components: {
    PostForm,
    PostList,
    MyDialog,
  },
  data() {
    return {
      posts: [],
      //модель для видимости диалогового окна
      dialogVisible: false,
      //для ожидания загрущки постов
      isPostsLoading: false,

      selectedSort: "",
      sortOptions: [
        { value: "title", name: "По названию" },
        { value: "body", name: "По содержимому" },
      ],

      searchQuery: "",

      //страница(номер)
      page: 1,
      //ограничение постов на странице
      limit: 10,
      //общее кол-во страниц
      totalPages: 0,
    };
  },

  methods: {
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

    //список с сервера
    async fetchPosts() {
      try {
        this.isPostsLoading = true;
        setTimeout(async () => {
          const res = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          );
          this.totalPages = Math.ceil(
            res.headers["x-total-count"] / this.limit
          );
          this.posts = res.data;
          console.log(res);
          this.isPostsLoading = false;
        }, 1200);
      } catch (e) {
        console.log(e);
      }
    },

    async loadMorePosts() {
      try {
        this.page += 1
        // this.isPostsLoading = true;
        setTimeout(async () => {
          const res = await axios.get(
            `https://jsonplaceholder.typicode.com/posts`,
            {
              params: {
                _page: this.page,
                _limit: this.limit,
              },
            }
          );
          this.totalPages = Math.ceil(
            res.headers["x-total-count"] / this.limit
          );
          this.posts = [...this.posts, ...res.data];
        }, 1200);
      } catch (e) {
        console.log(e);
      }// } finally {
      //   // this.isPostsLoading = false;
      // }
    },

    // changePage(z) {
    //   this.page = z
    // },
  },

  mounted() {
    this.fetchPosts();
    console.log(this.$refs.observer)
    // const options = {
    //   rootMargin: "0px",
    //   threshold: 1.0,
    // };
    // const callback = (entries, observer) => {
    //   /* Content excerpted, show below */
    //   if (entries[0].isIntersecting && this.page < this.totalPages) {
    //     this.loadMorePosts()
    //   }
    // };
    // const observer = new IntersectionObserver(callback, options);

    // //следить за следующими элементами
    // observer.observe(this.$refs.observer)
  },

  watch: {
    //название функции-наблюдателя должно совпадать с названием модели
    //в парамктрах - новое значение => то, на что была изменена модель
    // page(){
    //   this.fetchPosts()
    // }
  },

  computed: {
    sortedPosts() {
      return [...this.posts].sort((post1, post2) => {
        return post1[this.selectedSort]?.localeCompare(
          post2[this.selectedSort]
        );
      });
    },

    sortedAndSearchedPosts() {
      return this.sortedPosts.filter((p) =>
        p.title.toLowerCase().includes(this.searchQuery.toLowerCase())
      );
    },
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