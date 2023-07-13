<template>
    <main class="content">
        <section class="content__filters">
            <FilterNews />
            <div class="filters__directions">
                <button class="btn" @click="vertical='yes'">
                    <img v-if='isVertical' src="../assets/img/Sort1_active.png" alt="">
                    <img v-else src="../assets/img/Sort1_disabled.png" alt="">
                </button>
                <button class="btn" @click="vertical='no'">
                    <img v-if="isVertical" src="../assets/img/Sort2_disabled.png" alt="">
                    <img v-else src="../assets/img/Sort2_active.png" alt="">
                </button>
            </div>
        </section>
        <Card :filteredNews='filteredNews' :isVertical='isVertical' :size='size'/>
    </main>
</template>

<script setup lang="ts">
import {onMounted, ref, computed, watch} from 'vue'
import {useNewsStore} from '../store/store'
import {useRoute} from 'vue-router'
import {filterNews} from '../types/types'
import Card from '../components/Card.vue'
import FilterNews from '../components/FilterNews.vue'
const route = useRoute()
const newsStore = useNewsStore()
const vertical = ref<string | null>(null)
const size = computed(()=>{
    return window.innerWidth > 700
})
const isVertical = computed(()=>{
    return vertical.value === 'yes'
})
const filteredNews = computed(()=>{
    if(Object.values(route.query).join('') === filterNews.all || Object.values(route.query).length === 0) {
        return newsStore.getAllNews.sort(()=>Math.random()-0.5)
    }
    if(Object.values(route.query).join('') === filterNews.firstSource) {
        return newsStore.parsedElements3d
    }
    if(Object.values(route.query).join('') === filterNews.secondSource) {
        return newsStore.parsedElementsHabr
    }
})

onMounted(async()=>{
    vertical.value = JSON.parse(localStorage.getItem('isVertical')) || 'no'
    await Promise.all([newsStore.get3dNews(), newsStore.getHabrNews()])
    console.log(Object.values(route.query).length)
})
watch(vertical, (newVal: String)=>{
    localStorage.setItem('isVertical', JSON.stringify(newVal))
})
</script>

<style scoped>

</style>