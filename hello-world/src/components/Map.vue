<template>
  <div>Map goes here</div>
</template>

<script>
import {roomsCollection } from "@/firebaseConfig"

export default {
    name: 'Map',
    mounted() {
        roomsCollection.get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => ${doc.data()}`);
         });
});
    },
}
</script>

<style>

</style>