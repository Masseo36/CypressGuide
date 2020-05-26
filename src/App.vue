<template>
  <v-app style="background: #CFD8DC">
    <div v-if=" this.$session.exists() || jwt != null">
      <Header />
    </div>
    <v-content class="ml-4">
      <router-view></router-view>
    </v-content>
  </v-app>
</template>
 
<script>
import Header from "./components/Header.vue";
import { bus } from "./main";

export default {
  components: {
    //Metto il component header, quello comune a tutte le pagine
    Header
  },
  name: "App",
  data() {
    return {
      jwt: window.localStorage.getItem("jwt")
    };
  },
  mounted() {
    bus.$on("jwtNull", data => {
      this.jwt = data;
    });
    if (!this.$session.exists() && this.jwt === null) {
      this.$router.replace("/login", () => {});
    }
  }
};
</script>
 
 <style>
</style>