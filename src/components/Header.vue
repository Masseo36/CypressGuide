<template>
  <nav>
    <v-row wrap>
      <v-app-bar text app>
        <v-app-bar-nav-icon @click="drawer = !drawer" class="grey--text"></v-app-bar-nav-icon>
        <v-col md3>
          <v-toolbar-title class="text-uppercase grey--text">
            <span class="font-weight-light">Jersey&vue</span>
            <span>App</span>
          </v-toolbar-title>
        </v-col>

        <v-spacer></v-spacer>

        <!--<v-col md2 offset-md="4">
          <v-menu
            v-model="menuEmployees"
            :close-on-content-click="false"
            :nudge-width="200"
            offset-y
          >
            <template v-slot:activator="{ on }">
              <v-btn color="primary" dark v-on="on">
                <v-icon left>person</v-icon>Menu employees
              </v-btn>
            </template>

            <v-list>
              <v-list-item
                v-for="(pagina, index) in pagineEmployee"
                :key="index"
                router
                :to="pagina.route"
              >
                <v-list-item-title>{{ pagina.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>

        <v-col md2>
          <v-menu v-model="menuMezzi" :close-on-content-click="false" :nudge-width="200" offset-y>
            <template v-slot:activator="{ on }">
              <v-btn color="red" dark v-on="on">
                <v-icon left>directions_car</v-icon>Menu mezzi
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="(pagina, index) in pagineMezzi"
                :key="index"
                router
                :to="pagina.route"
              >
                <v-list-item-title>{{ pagina.text }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>-->

        <v-col md1>
          <v-btn text color="light-blue lighten-2" @click="logout">
            <span>Logout</span>
            <v-icon right>exit_to_app</v-icon>
          </v-btn>
        </v-col>
      </v-app-bar>
    </v-row>

    <v-navigation-drawer app v-model="drawer" class="indigo">
      <v-list-item v-for="link in links" :key="link.text" router :to="link.route">
        <v-list-item-action>
          <v-icon class="white--text">{{link.icon}}</v-icon>
        </v-list-item-action>
        <v-list-item-content>
          <v-list-item-title class="white--text">{{link.text}}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import axios from "axios";
import { bus } from "../main";
export default {
  data() {
    return {
      drawer: false,
      menuEmployees: "",
      menuMezzi: "",
      links: [
        {
          icon: "person",
          text: "Tutti gli employees",
          route: "/employeesListFromVuex"
        },
        {
          icon: "directions_car",
          text: "Tutti i mezzi",
          route: "/mezziListFromVuex"
        }
      ],
      pagineEmployee: [
        {
          icon: "person",
          text: "Tutti gli employees",
          route: "/employeesListFromVuex"
        },
        { icon: "person", text: "Cerca employe", route: "/ricercaEmployee" },
        {
          icon: "person",
          text: "Aggiungi employe",
          route: "/createEmployeeVuex"
        }
      ],
      pagineMezzi: [
        { icon: "person", text: "Tutti i mezzi", route: "/mezziListFromVuex" },
        { icon: "person", text: "Cerca mezzo", route: "/ricercaMezzi" },
        { icon: "person", text: "Aggiungi mezzo", route: "/addMezzo" }
      ]
    };
  },
  methods: {
    changeRout() {
      if (event.target.value == "Lista employees") {
        this.$router.push("/employees", () => {});
      }
      if (event.target.value == "Aggiungi employee") {
        this.$router.push("/create", () => {});
      }
      if (event.target.value == "Cerca employee") {
        this.$router.push("/ricercaEmployee", () => {});
      }
      if (event.target.value == "Lista mezzi") {
        this.$router.push("/mezzi", () => {});
      }
      if (event.target.value == "Aggiungi mezzo") {
        this.$router.push("/addMezzo", () => {});
      }
      if (event.target.value == "Cerca mezzo") {
        this.$router.push("/ricercaMezzi", () => {});
      }
      this.menùEmployee = "Menù employee";
      this.menùMezzo = "Menù mezzo";
    },
    logout() {
      //Chiedo conferma
      this.$confirm("Sei sicuro di voler uscire?", "Conferma", "question")
        .then(() => {
          //Termino sessione
          bus.$emit("jwtNull", window.localStorage.setItem("jwt", null));
          this.$session.destroy(), this.$router.push("/login", () => {});
        })
        .catch(() => {});
    },
    retrieveEmployees() {
      axios
        .get("http://localhost:8080/JerseyHibernateApp/webapi/employees")
        .then(results => {
          this.employees = results.data;
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.retrieveEmployees();
  }
};
</script>

<style scoped>
</style>