<template>
  <header class="header">
    <div class="navigation wrapper">
      <nav><p>Main</p></nav>
      <nav><p>Bookmarks</p></nav>
    </div>
  </header>
  <section class="content wrapper">
    <div class="search">
      <div class="location-input">
        <input type="text" v-model="location" @input="searchCoordinates" />
        <button @click="searchCoordinates">search</button>
      </div>
      <div class="search-results" v-if="location">
        <ul>
          <li v-for="(item, index) in locationsDropdown" :key="index">
            {{ `${item.name}, ${item.country}` }}
          </li>
        </ul>
        <p v-if="!locationsDropdown.length">No results</p>
      </div>
    </div>
    <div class="weather">
      <div class="weather-item default"></div>
      <div class="weather-item"></div>
      <div class="add-weather"></div>
    </div>
  </section>
  <div class="contacts"></div>
  <div class="confirmation-popup" v-show="false"></div>
</template>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useGeolocationStore } from '@/stores/counter'

const locationsDropdown = computed(() => store.getGeolocations)

const store = useGeolocationStore()

const location = ref('')

let timer = null

const searchCoordinates = (): void => {
  clearTimeout(timer)

  if (!location.value.length) {
    store.clearGeolocations()
    return
  }

  // "debounce" to prevent spamming requests
  // https://dev.to/jeetvora331/javascript-debounce-easiest-explanation--29hc
  timer = setTimeout(() => {
    store.getCoordinates(location.value)
  }, 500)
}
</script>

<style lang="scss" scoped>
//colors

//$orange-w:

.content {
  height: 50vh;
  border: 1px solid red;

  .search {
    width: 300px;
  }

  .location-input {
    display: flex;
  }

  .search-results {
    width: 100%;
    border: 1px solid;
    ul {
      list-style: none;
    }
  }

  input {
    box-sizing: border-box;
    width: 100%;
    height: 35px;
    &:focus {
      outline: none;
    }
  }
}

.header {
  height: 100px;
  border: 1px solid red;
}

.navigation {
  display: flex;
  height: 100%;
  nav {
    font-family: sans-serif;
    display: flex;
    justify-content: center;
    align-items: center;
    min-width: 100px;
    border: 1px solid red;
    text-align: center;
    width: 15%;
    text-transform: uppercase;
  }
}

.wrapper {
  max-width: 1200px;
  margin: auto;
  border: 1px solid red;
}
</style>
