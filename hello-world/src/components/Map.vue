<template>
<div>
  <div>Map goes here</div>
  <Room v-for="room in roomsList" :name="room" :key="room" @room-change="handleRoomChange" />
</div>
</template>

<script>
import Room from './Room.vue'
import { mapGetters } from "vuex"
import {db} from "@/firebaseConfig"

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
        ...mapGetters(["getCurrentUserUID"])
    },
    methods: {
    handleRoomChange(room) {
        if (this.currentRoom != null) {
            this.removeFromRoom(this.currentRoom, this.getCurrentUserUID)
        }
        this.addToRoom(room, this.getCurrentUserUID)
        // console.log(room)
        // console.log(this.getCurrentUserUID)
    },
    addToRoom(room, user) {
        let that = this
        db.collection("rooms").doc(room).collection("people").add({
            name: user
        })
        .then(function(docRef) {
            console.log("Document written with ID: ", docRef.id);
            that.currentRoom = room
        })
        .catch(function(error) {
            console.error("Error adding document: ", error);
        })
        },
    removeFromRoom(room, user) {
let query = db.collection('rooms').doc(room).collection("people").where('name','==',user);
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