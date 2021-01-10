<template>
<div>
  <div>Map goes here. You are in: {{currentRoom}}</div>
  <div>Here are the people currently in a room with you</div>

  <div v-for="p of peopleListFiltered" :key= "p" >{{p}}</div>

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
            peopleList: [],
        }
    },
    mounted() {
    },
    computed: {
    ...mapState({//grap vuex store (should hopefully have been synced with firebase)
      userName: state => state.userProfile.name,
      userUID: state => state.currentUser.uid,
    }),
    peopleListFiltered() {
        let newList = []
        for (let p of this.peopleList) {
            if (p.name && !newList.includes(p.name)) newList.push(p.name)
        }
        return newList
    },
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
        db.collection("rooms").doc(room).collection("people").get()
  .then(querySnapshot => {
    this.peopleList = querySnapshot.docs.map(doc => doc.data())
  });
  // forces update if room people list changes
        db.collection("rooms").doc(room).collection("people")
    .onSnapshot(function(snapshot) {
        snapshot.docChanges().forEach(function(change) {
            console.log(change)
            db.collection("rooms").doc(room).collection("people").get()
            .then(querySnapshot => {
                that.peopleList = querySnapshot.docs.map(doc => doc.data())
            });
        });
    });
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