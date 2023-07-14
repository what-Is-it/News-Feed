<template>
    <div class="filters__resources">
        <button class="btn"><router-link :to="{name: '', query: {news: filterNews.all }}">Все</router-link></button>
        <button class="btn"><router-link :to="{name: '', query: {news: filterNews.firstSource }}">3dnews.ru</router-link></button>
        <button class="btn"><router-link :to="{name: '', query: {news: filterNews.secondSource }}">habr.com</router-link></button>
    </div>
</template>

<script setup lang="ts">
import {filterNews} from '../types/types'

</script>

<style scoped>

</style>