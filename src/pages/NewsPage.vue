<template>
    <main class="content">
        <section class="content__filters">
            <FilterNews />
            <FilterDirections :isVertical='isVertical' @vertical='doVertical'/>
        </section>
        <Card v-if="filteredNews.length !== 0" :filteredNews='setupPagination' :isVertical='isVertical' :size='size'/>
        <h2 v-else>Ничего не найдено</h2>
        <Paginate 
            v-model="currentPage"
            :page-count="pageCount"
            :click-handler="pageHandler"
            :prev-text="''"
            :next-text="''"
            :container-class="'paginate'"
        />
    </main>
</template>

<script setup lang="ts">
import {onMounted, ref, computed, watch, Ref} from 'vue'
import {useNewsStore} from '../store/store'
import {useRoute, useRouter} from 'vue-router'
import {filterNews, INews} from '../types/types'
import Card from '../components/Card.vue'
import FilterNews from '../components/FilterNews.vue'
import FilterDirections from '../components/FilterDirections.vue'
import Paginate from 'vuejs-paginate-next'
import _ from 'lodash'
const router = useRouter()
const route = useRoute()
const newsStore = useNewsStore()
const vertical = ref<string | null>(null)
const currentPage = ref<number>(+route.query.page || 1)
const pageCount = ref<number>(0)
const paginateNews = ref([])
const pageSize = computed(()=>{
    if(isVertical.value){
        return 3
    } else {
        return 4
    }
})
const size:Ref<boolean> = computed(()=>{
    return window.innerWidth > 700
})
const isVertical:Ref<boolean> = computed(()=>{
    return vertical.value === 'yes'
})
const filteredNews:Ref<INews[] | null | undefined> = computed(()=>{
    if(route.query.news === filterNews.all || route.query.news === undefined) {
        if(route.query.filter === undefined) {
            return newsStore.getAllNews.sort(()=>Math.random()-0.5)
        } else {
            return newsStore.getAllNews.filter((news: INews):boolean => {
                return news.parsedTitle.toLowerCase().search(route.query.filter.toLowerCase()) !== -1
            })
        }
    }
    if(route.query.news === filterNews.firstSource) {
        if(route.query.filter === undefined) {
            return newsStore.parsedElements3d
        } else {
            return newsStore.parsedElements3d.filter((news: INews):boolean => {
                return news.parsedTitle.toLowerCase().search(route.query.filter.toLowerCase()) !== -1
            })
        }
    }
    if(route.query.news === filterNews.secondSource) {
        if(route.query.filter === undefined) {
            return newsStore.parsedElementsHabr
        } else {
            return newsStore.parsedElementsHabr.filter((news: INews):boolean => {
                return news.parsedTitle.toLowerCase().search(route.query.filter.toLowerCase()) !== -1
            })
        }
    }
})

onMounted(async()=>{
    vertical.value = JSON.parse(localStorage.getItem('isVertical')) || 'no'
    await Promise.all([newsStore.get3dNews(), newsStore.getHabrNews()])
})
watch(vertical, (newVal: string)=>{
    localStorage.setItem('isVertical', JSON.stringify(newVal))
})

const setupPagination: Ref<INews[]> = computed(()=> {
    paginateNews.value = _.chunk(filteredNews.value, pageSize.value)
    pageCount.value = _.size(paginateNews.value)
    return paginateNews.value[currentPage.value - 1] || paginateNews.value[0]
})

function pageHandler(page:number):void{
    router.push({name: '', query: {
        news: route.query.news?route.query.news:undefined,
        filter: route.query.filter?route.query.filter:undefined,
        page: currentPage.value
    }})
    currentPage.value = (page)
}
function doVertical(props:string):void {
    vertical.value = props
}
</script>

<style scoped>

</style>