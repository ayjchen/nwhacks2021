<template>
  <div id="profile">
    <div class="userInfo">Kate Lu</div>
    <div class="userInfo">Student</div>
    <b-btn @click="updateProfile">Click to update</b-btn>
  </div>
</template>

<script>
export default {
  name: 'Profile',

  components: {
  },

  methods: {
    updateProfile() {
      console.log("update profile for Kate");
    }
  }
}
</script>

<style>
.userInfo {
  margin: 0.5rem;
}

#profile {
  padding: 2rem;
  min-width: 800px;
  background-color: papayawhip;
}
</style>