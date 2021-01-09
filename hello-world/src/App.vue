<template>
  <div id="app">
    <Profile/>
    <Map />
  </div>
</template>

<script>
import Profile from './components/Profile.vue'
import Map from './components/Map'

export default {
  name: 'App',
  components: {
    Profile,
    Map
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
