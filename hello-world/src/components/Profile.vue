<template>
  <div id="profile">
    <div class="userInfo">{{ userName }}</div>
    <div class="userInfo">{{ userRole }}</div>
    <b-btn @click="updateProfile">Click to update</b-btn>
  </div>
</template>

<script>
import { usersCollection } from "@/firebaseConfig"

export default {
  name: 'Profile',
  data() {
		return {
      userName: "",
      userRole: ""
    }
  },
  components: {
    
  },
  mounted() {
    this.fetchProfile();
  },
  methods: {
    fetchProfile() {

      usersCollection.doc('wuDzgF9FuabsbGJ6Pb5S').get().then(doc => {
        const userInfo = doc.data()
        this.userName = userInfo.name;
        this.userRole = userInfo.role;
      });
      
    },

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