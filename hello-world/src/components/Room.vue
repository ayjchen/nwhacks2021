<template>
<div>
  <div>This is the {{name}} room</div>
    <b-btn @click="updateRoomMembers">Click to go here</b-btn>
</div>
</template>

<script>
import {roomsCollection, db } from "@/firebaseConfig"

export default {
    name: 'Room',
    mounted() {
        console.log(roomsCollection)
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
        updateRoomMembers() {
            db.collection("rooms").add({
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
})
.then(function(docRef) {
    console.log("Document written with ID: ", docRef.id);
})
.catch(function(error) {
    console.error("Error adding document: ", error);
})
        }
    }
}
</script>

<style>

</style>