<template>
    <header class="header">
        <div class="header__title">
            <h1>Список новостей</h1>
            <button class="btn" @click="refresh"></button>
        </div>
        <form class="header__search" @submit.prevent="addSearch">
            <input type="text" class="search" v-model="searchValue">
            <button type="submit" class="btn"><img src="../assets/img/Search.png" alt=""></button>
        </form>
    </header>
</template>

<script setup lang="ts">
import {useNewsStore} from '../store/store'
import {onMounted, ref, computed, watch} from 'vue'
import {useRoute, useRouter} from 'vue-router'
const router = useRouter()
const route = useRoute()
const searchValue = ref('')
const newsStore = useNewsStore()
async function refresh() {
    searchValue.value = ''
    let currentElement = document.querySelector('.active-filter')
    let filtersBlock = document.querySelector('.filters__resources')
    filtersBlock?.firstChild?.firstChild.classList.add('active-filter')
    currentElement?.classList.remove('active-filter')
    router.push({name: '', query: {
        news: undefined,
        filter: undefined
    }})
    await Promise.all([newsStore.get3dNews(), newsStore.getHabrNews()])
}
function addSearch(){
    router.push({name: '', query: {
        news: route.query.news?route.query.news:undefined,
        filter: searchValue.value.trim()
    }})
}
</script>

<style scoped>

</style>