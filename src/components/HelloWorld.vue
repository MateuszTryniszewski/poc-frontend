<template>
  <div class="greetings">
    <h1 class="green">{{ msg }}</h1>
    <h3>
      You’ve successfully created a project with
      <a href="https://vitejs.dev/" target="_blank" rel="noopener">Vite</a> +
      <a href="https://vuejs.org/" target="_blank" rel="noopener">Vue 3</a>. What's next?
    </h3>

    <BaseButton primary></BaseButton>
    <BaseButton backgroundColor="bg-orange-300 text-orange-900 mx-5" @click="themeMode = !themeMode" label="zmien motyw"/>
    <BaseSelect label="SELECT" name="pole1" :options="['a','b','c']" ></BaseSelect>
  </div>
</template>


<script setup lang="ts">
import { ref, watch } from 'vue'
import BaseButton from './atoms/button/BaseButton.vue';
import BaseSelect from './atoms/input/baseSelect.vue';

  defineProps<{
    msg: string
  }>()

  const themeMode = ref(false)


  watch(themeMode, (newValue: boolean, oldValue) => {
    if (newValue === true) {
      document.documentElement.classList.add('dark')
      console.log('a')
    } else {
      document.documentElement.classList.remove('dark')
      console.log('b')
    }
  })
</script>

<style scoped>
h1 {
  font-weight: 500;
  font-size: 2.6rem;
  top: -10px;
}

h3 {
  font-size: 1.2rem;
}

.greetings h1,
.greetings h3 {
  text-align: center;
}

@media (min-width: 1024px) {
  .greetings h1,
  .greetings h3 {
    text-align: left;
  }
}
</style>
