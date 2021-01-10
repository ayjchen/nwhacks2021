<template>
  <div id="profile">
    <div class="userInfo">{{ userName }}</div>
    <div class="userInfo">{{ userRole }}</div>
    <b-btn @click="updateProfile">Click to update</b-btn>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  name: 'Profile',
  data() {
		return {
    }
  },
  computed: {
    ...mapState({//grap vuex store (should hopefully have been synced with firebase)
      userName: state => state.userProfile.name,
      userRole: state => state.userProfile.role,
    }),
  },
  components: {
    
  },
  methods: {

    updateProfile() {
      console.log("update profile for " + this.userName);
    },

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