<template>
  <div>
    <div class="menu">
      <b-btn class="menu-btn" variant="info" size="lg" pill @click="openProfile">Profile</b-btn>
      <b-btn class="menu-btn" variant="secondary" size="lg" pill @click="openHelp">Help</b-btn>
    </div>
    <!-- Modals -->
    <div>
      <b-modal v-model="profileModal">
        <Profile/>
      </b-modal>
      <b-modal v-model="helpModal">Press the arrow keys on your keyboard to walk around
        the map. You'll receive a video call join option if you bump into someone! ;D
      </b-modal>
    </div>
    <Map />
  </div>
</template>

<script>
import Profile from '@/components/Profile.vue'
import Map from '@/components/Map'

export default {
  name: 'Home',
  data() {
		return {
      profileModal: false,
      helpModal: false,
    }
  },
  components: {
    Profile,
    Map,
  },
  methods: {
    openProfile() { 
      this.profileModal = true;
    },
    openHelp() {
      this.helpModal = true;
    }
  }
}
</script>

<style scoped>
.menu {
  position: absolute;
  top: 1rem;
  left: 1rem;
  font-family: Avenir !important;
}

.menu-btn {
  margin: 1.5rem 0.5rem;
  display: block;
  width: 100px;
  font-weight: 500;
  border: 2px solid white;
}
</style>
