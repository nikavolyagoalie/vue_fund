import { createStore } from "vuex";
import { PostModule } from "@/components/router/PostModule";

export default createStore({
    modules: {
        post: PostModule
    }
})