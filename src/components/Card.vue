<template>
    <section class="content__card">
        <div class='card' :class="isVertical? 'card-vertical': 'card-horizontal'" v-for="(el, index) of filteredNews" :key="el.index">
            <input type="checkbox" class="more-checker" id="more-checker" />
            <div class="card__info">
                <div v-if="isVertical" class="card__image">
                   <img :src="el.source==='habr.com' ? 'src/assets/img/Habr.png' : el.parsedImg" alt="image"/> 
                </div>
                <div>
                    <h1>{{el.parsedTitle}}</h1>
                    <p class="card__description wrap-text" v-html="el.parsedDescription"></p>
                </div>
            </div>
            <label v-if="!(isVertical && size)" for="more-checker" class="more-button"></label>
            <!-- <button @click="more(index)"  v-if="!(isVertical && size)" class="btn">Подробнее</button> -->
            <div class="card__footer">
                <a :href="el.source==='habr.com'? 'https://habr.com/ru/all/': 'https://3dnews.ru/'">{{el.source}}</a>
                <p class="footer__time">{{el.parsedTime}}</p>
            </div>
        </div>
    </section>
</template>

<script setup lang="ts">
defineProps<{
    filteredNews: []
    isVertical: Boolean,
    size: Boolean
}>()
</script>

<style scoped>

</style>