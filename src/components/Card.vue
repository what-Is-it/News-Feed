<template>
    <section class="content__card">
        <div class='card' :class="isVertical? 'card-vertical': 'card-horizontal'" v-for="el of filteredNews" :key="el.index">
            <h1>{{el.parsedTitle}}</h1>
            <p class="card__description wrap-text" v-html="el.parsedDescription"></p>
            <button v-if="!(isVertical && size)" class="btn">Подробнее</button>
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