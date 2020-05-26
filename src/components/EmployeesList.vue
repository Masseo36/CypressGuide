<template>
  <v-container class="my-5">
    <!--<v-row wrap class="mb-n6 ml-6">
      <v-col md="2" offset-md="1">
        <v-btn small color="primary" @click="sortBy('surname')">
          <v-icon medium left>sort_by_alpha</v-icon>
          <span class="caption text-lowercase">Ordina per cognome</span>
        </v-btn>
      </v-col>
      <v-col md="2">
        <v-btn small color="primary" @click="sortBy('age')">
          <v-icon medium left>event</v-icon>
          <span class="caption text-lowercase">Ordina per età</span>
        </v-btn>
      </v-col>
    </v-row>-->
    <v-card raised style="background: #F9FBE7" class="mt-8 mx-auto" width="850">
      <v-card-title>
        <h1 class="subheading grey--text">Employees</h1>
        <v-spacer></v-spacer>
        <v-text-field
          data-cy="search"
          v-model.trim="search"
          append-icon="mdi-magnify"
          label="Ricerca puntuale"
          single-line
          hide-detail
        ></v-text-field>
      </v-card-title>
      <v-container>
        <v-row row wrap>
          <v-col md="2">
            <div class="headline font-weight-medium blue--text">
              <h5>Nome</h5>
            </div>
          </v-col>
          <v-col md="2">
            <div class="headline font-weight-medium blue--text">
              <h5>Cognome</h5>
            </div>
          </v-col>
          <v-col md="2">
            <div class="headline font-weight-medium blue--text">Età</div>
          </v-col>
        </v-row>
        <v-col>
          <v-row
            row
            wrap
            class="mt-n6"
            v-for="employee in filterData"
            :key="employee.id"
            data-cy="list"
          >
            <v-col md="2" class="ml-n4">
              <div class="headline font-weight-medium orange--text">{{employee.name}}</div>
            </v-col>
            <v-col md="2" class="ml-2">
              <div class="headline font-weight-medium orange--text">{{employee.surname}}</div>
            </v-col>
            <v-col md="2" class="ml-2">
              <div class="headline font-weight-medium orange--text">{{employee.age}}</div>
            </v-col>
            <v-col md="3">
              <v-btn
                id="dettagliButton"
                color="primary"
                class="mb-5"
                :to="{
                            name: 'employee-dettagli',
                            params: { employee: employee, id: employee.id },
                            path: '/employees/dettagli/' + employee.id
                        }"
              >
                Dettagli
                <v-icon dark right>description</v-icon>
              </v-btn>
            </v-col>
            <v-col md="2" class="ml-2">
              <div v-if="employee.active" class="headline font-weight-medium orange--text">
                <v-chip class="green white--text">Attivo</v-chip>
              </div>
              <div v-else class="headline font-weight-medium orange--text">
                <v-chip class="red white--text">Inattivo</v-chip>
              </div>
            </v-col>
          </v-row>
        </v-col>
      </v-container>
    </v-card>
  </v-container>
</template>

<script>
//import http from "../http-common";
import axios from "axios";
export default {
  name: "employees-list",

  data() {
    return {
      search: "",
      employees: [],
      /* [{ id: 150, name: "Max", surname: "Vit" },
        { id: 300, name: "Jon", surname: "Ford" }
      ],*/ employee:
        "",
      surnameEmployee: "",
      counter: 0
    };
  },
  computed: {
    filterData() {
      var reg = new RegExp(this.search, "i");
      var data = [];

      for (var i in this.employees) {
        if (
          this.employees[i].name.match(reg) ||
          this.employees[i].surname.match(reg)
        ) {
          data.push(this.employees[i]);
        }
      }
      return data;
    }
  },
  methods: {
    retrieveEmployees() {
      axios
        .get("http://localhost:8080/JerseyHibernateApp/webapi/employees")
        .then(results => {
          this.employees = results.data;
        })
        .catch(e => {
          console.log(e);
        });
    },
    /*retrieveEmployees() {
      axios
        .get("http://localhost:8080/JerseyHibernateApp/webapi/employees")

        .then(results => {
          this.employees = results.data;
        });
    },*/
    /*  http
        .get("/employees")
        .then(result => {
          this.employees = result.data; // JSON are parsed automatically.
          console.log(this.employees);
        })
        .catch(e => {
          console.log(e);
        });
    },*/ refreshList() {
      this.retrieveEmployees();
    },
    goToUpdatePage() {},
    sortBy(prop) {
      this.employees.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
    increaseCounter() {
      this.counter++;
    }
  },
  filters: {
    uppercase: function(v) {
      return v.toUpperCase();
    }
  },
  mounted() {
    this.retrieveEmployees();
  }
};
</script>
 
<style scoped>
</style>