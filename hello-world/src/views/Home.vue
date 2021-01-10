<template>
  <div>
    <Profile/>
    <Map />
  </div>
</template>

<script>
import Profile from '@/components/Profile.vue'
import Map from '@/components/Map'

export default {
  name: 'Home',
  components: {
    Profile,
    Map,
  }
}
</script>

<style>
</style>
