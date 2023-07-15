<template>
    <div class="filters__resources" @click="filterClass">
        <button class="btn filter__button" ><router-link class="filter filter-link active-filter" :to="{name: '', query: {news: filterNews.all }}">Все</router-link></button>
        <button class="btn filter__button" ><router-link class="filter filter-link" :to="{name: '', query: {news: filterNews.firstSource }}">3dnews.ru</router-link></button>
        <button class="btn filter__button" ><router-link class="filter filter-link" :to="{name: '', query: {news: filterNews.secondSource }}">habr.com</router-link></button>
    </div>
</template>

<script setup lang="ts">
import {filterNews} from '../types/types'
function filterClass(event: Event){
    let currentElement = document.querySelector('.active-filter')
    currentElement?.classList.remove('active-filter')
    event.target.classList.add('active-filter')
}

</script>

<style scoped>

</style>