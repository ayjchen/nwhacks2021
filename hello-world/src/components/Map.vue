<template>
<div>
  <div class="sticky">
  <div>Map goes here. You are in: {{currentRoom}}</div>
   <div>Here are the people currently in a room with you</div>

  <div v-for="p of peopleListFiltered" :key= "p" >{{p}}</div>
  <button class="btn btn-primary" type="button" disabled v-if="waiting">
  <span class="spinner-grow spinner-grow-sm" role="status" aria-hidden="true"></span>
  Trying to bump into someone...
</button>
  </div>
  
  <div id="map_background"></div>
 

  <Avatar @room-change="handleRoomChange"/>

  <!-- <Room v-for="room in roomsList" :name="room" :key="room" @room-change="handleRoomChange" /> -->
  
  <b-modal ref="modal" size="lg" hide-footer>
      Somebody has BUMPED into you! Enter a call? <br/>
      <b-button 
      href="http://127.0.0.1:9999/meeting.html?name=Name&mn=7789476351&email=&pwd=d2RhTUNRMmhJNVN3Um5YUkdZWDhjUT09&role=0&lang=en-US&signature=bldYVWRCd01ReWVZc0NLYk5RTTE1US43Nzg5NDc2MzUxLjE2MTAyNTE0OTMzNTUuMC5lT0R1WStVUjlFbklteDU1RUdoeGtYVTZid21ZK0dZbmZpaHErRHQ5WTk0PQ&china=0&apiKey=nWXUdBwMQyeYsCKbNQM15Q"
      target="_blank">Hop On!</b-button>
  </b-modal>
</div>
</template>

<script>
// import Room from './Room.vue'
import Avatar from './Avatar.vue'
import {db} from "@/firebaseConfig"
import {mapState} from "vuex"

export default {
  components: {  Avatar},
    name: 'Map',
    data() {
        return {
            currentRoom: null,
            roomsList: ["NEST","IKB","LIFE"],
            peopleList: [],
            meetingPerson: "",
            waiting: false,
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
        showModal() {
        this.$refs['modal'].show()
        },
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
        //scan queue
        db.collection("queue").doc(room).get().then(doc => {
            let data = doc.data()
            if (data.waiting) {
                that.showModal()
                that.waiting = false
                db.collection("queue").doc(room).update({
                    waiting: false,
                    uid: "",
                    name: "",
                })
            } else {
                db.collection("queue").doc(room).update({
                    waiting: true,
                    uid: that.userUID,
                    name: that.userName
                })
                that.waiting = true   
            }
        });
        // monitor queue if you are waiting.
        db.collection("queue").doc(room).onSnapshot(function(doc) {
            let data = doc.data()
            if (!data.waiting && data.uid == that.userUID) {
                that.showModal()
                that.waiting = false
            }
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
.btn {
    z-index: 999;
}

#map_background {
  z-index: -1;
  height: 95vh;
  min-width: 100%;
  position: absolute;
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat;
  background-image: url(../assets/ubc_map.png);
}

.sticky {
  background: white;
  position: fixed;
  top: 0;
  right: 0;
}
</style>