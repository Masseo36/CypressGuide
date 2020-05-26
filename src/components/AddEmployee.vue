<template>
  <div class="submitform" id="addEmployee">
    <div class="form-group">
      <label for="name">
        <h4>Nome</h4>
      </label>
      <input
        placeholder="Inserire nome"
        type="text"
        class="form-control"
        id="name"
        required
        v-model="employee.name"
        name="name"
      />
    </div>
    <div class="form-group">
      <label for="surname">
        <h4>Cognome</h4>
      </label>
      <input
        placeholder="Inserire cognome"
        type="text"
        class="form-control"
        id="surname"
        required
        v-model="employee.surname"
        name="surname"
      />
    </div>

    <div class="form-group">
      <label for="age">
        <h4>Età</h4>
      </label>
      <input
        type="number"
        class="form-control"
        id="age"
        required
        v-model="employee.age"
        name="age"
        placeholder="Inserire età"
      />
    </div>

    <div v-if="employee.name.length > 0 && employee.surname.length > 0 && employee.age > 0">
      <button v-on:click="saveEmployee" class="btn btn-success" data-cy="addEmployee">Add</button>
    </div>
    <div class="aggiungiEmployee">
      <h2 style="color:orangered;">AGGIUNGI EMPLOYEE</h2>
    </div>
  </div>
</template>
 
<script>
//import http from "../http-common";
import axios from "axios";

export default {
  name: "add-employee",
  data() {
    return {
      employee: {
        name: "",
        surname: "",
        age: ""
      }
    };
  },
  methods: {
    /* eslint-disable no-console */
    saveEmployee() {
      var data = {
        name: this.employee.name,
        surname: this.employee.surname,
        age: this.employee.age
      };
      if (
        this.employee.name.length == 0 ||
        this.employee.surname.length == 0 ||
        this.employee.age <= 0
      ) {
        this.$alert("Riempire tutti i campi", "Errore", "error");
      } else {
        axios
          .post("http://localhost:8080/JerseyHibernateApp/webapi/create", data)
          .then(() => {
            console.log(data);
            this.refresh();
            this.$router.push("/employees");
          })
          .catch(e => {
            console.log(e);
          });
      }
      this.submitted = true;
    },
    newEmployee() {
      this.submitted = false;
      this.employee = {};
    },
    refresh() {
      this.$alert("Aggiungi utente", "Utente aggiunto!", "success");
      this.employee.name = "";
      this.employee.surname = "";
      this.employee.age = "";
    }
    /* eslint-enable no-console */
  }
};
</script>
 
<style scoped>
::-webkit-input-placeholder {
  background-color: lightcyan;
  color: black;
  font-size: 18px;
  font-family: cursive;
}
.submitform {
  max-width: 300px;
  margin: auto;
  color: orangered;
}
.aggiungiEmployee {
  position: absolute;
  content: "";
  bottom: 100px;
  right: 60px;
  height: 370px;
  width: 400px;
  background: #9ed9eb;
  transform: rotate(-25deg);
}
</style>