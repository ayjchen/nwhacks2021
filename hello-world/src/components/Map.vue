<template>
<div>
  <div>Map goes here</div>
  <Room v-for="room in roomsList" :name="room" :key="room" @room-change="handleRoomChange" />
</div>
</template>

<script>
import Room from './Room.vue'
import {db} from "@/firebaseConfig"
import {mapState} from "vuex"

export default {
  components: { Room },
    name: 'Map',
    data() {
        return {
            currentRoom: null,
            roomsList: ["NEST","IKB","LIFE"],
        }
    },
    mounted() {
    },
    computed: {
    ...mapState({//grap vuex store (should hopefully have been synced with firebase)
      userName: state => state.userProfile.name,
      userUID: state => state.currentUser.uid,
    }),
  },
    methods: {
    handleRoomChange(room) {
        if (this.currentRoom != null) {
            this.removeFromRoom(this.currentRoom, this.userUID)
        }
        this.addToRoom(room)
    },
    addToRoom(room) {
        let that = this
        db.collection("rooms").doc(room).collection("people").add({
            name: this.userName,
            uid: this.userUID
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            that.currentRoom = room
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        })
        },
    removeFromRoom(room, uid) {
let query = db.collection('rooms').doc(room).collection("people").where('uid','==',uid);
query.get().then((querySnapshot) => {
  querySnapshot.forEach((doc) => {
    doc.ref.delete();
  });
});
    }
    },

}
</script>

<style>

</style>