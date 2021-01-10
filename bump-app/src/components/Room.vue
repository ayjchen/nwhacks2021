<template>
<div>
  <div>This is the {{name}} room</div>
    <b-btn @click="goToRoom">Click to go here</b-btn>
</div>
</template>

<script>

export default {
    name: 'Room',
    mounted() {
    },
    props: {
        name,
    },
    data() {
        return {
            currentPeople: [],
        }
    },
    methods: {
      goToRoom() {
          this.$emit("room-change", this.name)
      }
    }
}
</script>

<style>

</style>