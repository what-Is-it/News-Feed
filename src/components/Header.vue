<template>
    <header class="header">
        <div class="header__title">
            <h1>Список новостей</h1>
            <button class="btn" @click="refresh"></button>
        </div>
        <form class="header__search">
            <input type="text" class="search">
            <button type="submit" class="btn"><img src="../assets/img/Search.png" alt=""></button>
        </form>
    </header>
</template>

<script setup lang="ts">
import {useNewsStore} from '../store/store'
const newsStore = useNewsStore()
async function refresh() {
    await Promise.all([newsStore.get3dNews(), newsStore.getHabrNews()])
}
</script>

<style scoped>

</style>