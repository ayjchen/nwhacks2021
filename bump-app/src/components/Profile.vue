<template>
  <div id="profile">
    <img style="width: 120px" src="../assets/profile.png" alt="">
    <div class="label">Name</div>
    <div class="userInfo">{{ userName }}</div>
    <div class="label">Role</div>
    <div class="userInfo">{{ userRole }}</div>
    <!-- <b-btn @click="updateProfile">Click to update</b-btn> -->
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
.label {
  color: grey;
}

.userInfo {
  margin: 0 0.5rem 0.5rem;
  font-size: 20px;
}

#profile {
  text-align: center;
  font-family: Avenir;
}
</style>