<template>
  <v-app id="inspire" style="background: #c0ded9">
    <v-content>
      <v-container class="fill-height" fluid>
        <v-row align="center" justify="center">
          <v-col cols="12" sm="8" md="4">
            <v-card class="elevation-12">
              <v-toolbar color="primary" dark flat>
                <v-toolbar-title>Login form</v-toolbar-title>
                <v-spacer />
                <v-tooltip bottom></v-tooltip>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn icon large target="_blank" v-on="on" @click="goToRegistration">
                      <v-icon>person_add</v-icon>
                    </v-btn>
                  </template>
                  <span>Registrati</span>
                </v-tooltip>
              </v-toolbar>
              <v-card-text>
                <v-form>
                  <v-text-field
                    label="username"
                    name="username"
                    prepend-icon="person"
                    type="text"
                    v-model="username"
                    :rules="inputRules"
                  />

                  <v-text-field
                    id="password"
                    label="Password"
                    name="password"
                    prepend-icon="lock"
                    type="password"
                    v-model="password"
                  />
                </v-form>
              </v-card-text>
              <v-card-actions>
                <v-spacer />
                <v-btn color="primary" rounded @click="login" data-cy="loginButton">Login</v-btn>
              </v-card-actions>
              <v-card-actions>
                <v-tooltip right>
                  <template v-slot:activator="{ on }">
                    <v-btn
                      color="primary"
                      icon
                      large
                      target="_blank"
                      v-on="on"
                      @click="goToRecuperoPassword"
                    >
                      <v-icon>help</v-icon>
                    </v-btn>
                  </template>
                  <span>Recupera password</span>
                </v-tooltip>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-content>
  </v-app>
</template>


<script>
import http from "../http-common";
export default {
  name: "Login",
  data() {
    return {
      username: "",
      password: "",
      inputRules: [v => !!v || "Inserire un indirizzo e-mail"]
    };
  },
  methods: {
    login() {
      console.log(this.username);
      if (this.username != "" && this.password != "") {
        http
          .post("/login/" + this.username + "login/" + this.password)
          .then(response => {
            this.employees = response.data; // JSON are parsed automatically.
            //La sessione inizia
            this.$session.start();
            console.log(this.$session.id());
            if (this.employees.length > 0 && this.employees[0].active == 1) {
              this.$emit("authenticated", true);
              this.$router.replace("/employees", () => {});
            } else if (
              this.employees.length > 0 &&
              this.employees[0].active == 0
            ) {
              this.$router.replace("/primoAccesso", () => {});
            } else if (this.employees.length == 0)
              this.$alert("Username e/o password errati", "Errore", "error");
          });
      } else
        this.$alert("Riempire correttamente tutti i campi", "Errore", "error");
    },
    goToRegistration() {
      this.$router.push({ path: "/registraEmployee" });
    },
    goToRecuperoPassword() {
      this.$router.push({ path: "/recuperoPassword" });
    }
  }
};
</script>

<style scoped>
</style>