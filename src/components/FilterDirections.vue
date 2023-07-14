<template>
    <div class="filters__directions">
        <button class="btn" @click="$emit('vertical', 'yes')">
            <img v-if='isVertical' src="../assets/img/Sort1_active.png" alt="vertical-blocks">
            <img v-else src="../assets/img/Sort1_disabled.png" alt="vertical-blocks">
        </button>
        <button class="btn" @click="$emit('vertical', 'no')">
            <img v-if="isVertical" src="../assets/img/Sort2_disabled.png" alt="horizontal-blocks">
            <img v-else src="../assets/img/Sort2_active.png" alt="horizontal-blocks">   
        </button>
    </div>
</template>

<script setup lang="ts">
defineProps<{
    isVertical: Boolean,
}>()
emits: ['vertical']


</script>

<style scoped>

</style>