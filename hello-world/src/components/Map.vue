<template>
<div>
  <div>Map goes here</div>
  <Room v-for="room in roomsList" :name="room" :key="room" />
</div>
</template>

<script>
import Room from './Room.vue'

export default {
  components: { Room },

    name: 'Map',
    data() {
        return {
            currentRoom: null,
            roomsList: ["nest","IKB","LIFE"],
        }
    },
    mounted() {
    },
    methods: {
        
    }
}
</script>

<style>

</style>