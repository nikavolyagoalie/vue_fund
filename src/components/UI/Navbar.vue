<template>
    <div class="navbar">
        <div @click="$router.push('/')" style="cursor: pointer">My App</div>
        <div class="navbar__btns">
            <my-button @click="$router.push('/posts')">My Posts</my-button>
            <my-button @click="$router.push('/store')">My PostsStore</my-button>
            <my-button @click="$router.push('/composition')">My PostsCompositionAPI</my-button>
        </div>
    </div>
</template>

<script>
export default {

}
</script>

<style scoped>
    .navbar {
        height: 50px;
        background-color: teal;
        box-shadow: 2px 2px 4px gray;
        display: flex;
        align-items: center;
        padding: 0 15px;
    }

    .navbar__btns {
        margin-left: auto;
    }
</style>