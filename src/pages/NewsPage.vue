<template>
    <main class="content">
        <section class="content__filters">
            <div class="filters__resources">
                <button class="btn">Все</button>
                <button class="btn">3dnews.ru</button>
                <button class="btn">habr.com</button>
            </div>
            <div class="filters__directions">
                <button class="btn" @click="vertical = !vertical">
                    <img v-if='vertical' src="../assets/img/Sort1_active.png" alt="">
                    <img v-else src="../assets/img/Sort1_disabled.png" alt="">
                </button>
                <button class="btn" @click="vertical = !vertical">
                    <img v-if="vertical" src="../assets/img/Sort2_disabled.png" alt="">
                    <img v-else src="../assets/img/Sort2_active.png" alt="">
                </button>
            </div>
        </section>
        <section class="content__card">
            <div class='card' :class="vertical? 'card-vertical': 'card-horizontal'" v-for="el of parsedElements3d" :key="el.index">
                <h1>{{el.parsedTitle}}</h1>
                <p class="card__description wrap-text" v-html="el.parsedDescription"></p>
                <button v-if="!(vertical && size)" class="btn">Подробнее</button>
                <div class="card__footer">
                    <a  href="">link</a>
                    <p class="footer__time">{{el.parsedTime}}</p>
                </div>
            </div>
        </section>
    </main>
</template>

<script setup lang="ts">
import {onMounted, ref, computed} from 'vue'
import {axiosHabr, axios3d} from '../utils/axios.config'
const parsedElementsHabr = ref([])
const parsedElements3d = ref([])
const vertical = ref(true)
const size = computed(()=>{
    return window.innerWidth > 700
})
onMounted(async()=>{
    await axiosHabr.get()
        .then((habrResponse)=>{
            const parser = new DOMParser
            const doc = parser.parseFromString(habrResponse.data, 'text/xml')
            const items = doc.getElementsByTagName("item")
            const isHabr = doc.getElementsByTagName("link")[0].textContent === 'https://habr.com/ru/all/'
            for (let item of items) {
                const element = {}
                element['parsedTitle'] = item.getElementsByTagName("title")[0].textContent
                element['parsedDescription'] = item.getElementsByTagName("description")[0].textContent
                element['parsedTime'] = item.getElementsByTagName("pubDate")[0].textContent

                parsedElementsHabr.value.push(element)
            }
    console.log(items)
    console.log(isHabr)
    console.log(parsedElementsHabr)
    })
    await axios3d.get()
        .then((response3d)=>{
                const parser = new DOMParser
                const doc = parser.parseFromString(response3d.data, 'text/xml')
                const items = doc.getElementsByTagName("item")
                const is3d = doc.getElementsByTagName("link")[0].textContent === 'https://3dnews.ru/'
                for (let item of items) {
                    const element = {}
                    element['parsedTitle'] = item.getElementsByTagName("title")[0].textContent
                    element['parsedDescription'] = item.getElementsByTagName("description")[0].textContent
                    element['parsedTime'] = item.getElementsByTagName("pubDate")[0].textContent
                    element['parsedImg'] =  item.getElementsByTagName("enclosure")[0].textContent

                    parsedElements3d.value.push(element)
                }
    console.log(items)
    console.log(is3d)
    console.log(parsedElements3d)
    })
})
</script>

<style scoped>

</style>