<template>
  <b-form style="margin-top:5rem" @submit.prevent>
    <br>
    <img src="../assets/bump_logo.png" style="width:10%;">
    <div class="col-md-6 col-md-offset-3" style="margin:auto;">
    <b-form-group
      id="input-group-1"
      label="Email:"
      label-for="input-1"
      class="text-left"
    >
      <b-form-input
        id="input-1"
        v-model.trim="loginForm.email"
        type="email"
        required
        placeholder="Enter email"
      ></b-form-input>
    </b-form-group>
    <b-form-group
      id="input-group-2"
      label="Password:"
      label-for="input-2"
      class="text-left"
    >
      <b-form-input
        id="input-2"
        v-model.trim="loginForm.password"
        type="password"
        required
        placeholder="******"
      ></b-form-input>
    </b-form-group>
    <p class="error-message" style="color: red;">{{ error }}</p>
    </div>
    <b-btn style="margin-top: 1.5rem" variant="info" size="lg" pill @click="login" type="submit" class="submit_button">Log In</b-btn>
  </b-form>
</template>

<script>
import { auth } from "@/firebaseConfig"

export default {
  name: 'Login',
  data() {
		return {
      loginForm: {
        email: "",
        password: "",
      },
      error: null,
    }
  },
  components: {
    
  },
  methods: {
    login() {
      this.error = "";
      auth
        .signInWithEmailAndPassword(this.loginForm.email, this.loginForm.password)
        .then((user) => {
          user = auth.currentUser;
          this.$store.commit("setUser", user);
          this.$store.dispatch("fetchUserProfile");
          console.log("Signed in successfully!")
          this.$router.replace({ name: "Home" });
        })
        .catch(err => {
          this.error = err.message;
        });
    }

  }
}
</script>

<style>
.text-left {
  left: 200px;
}

.input-1 {
  color: red;
}

</style>