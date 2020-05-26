import Vue from "vue";
import Router from "vue-router";

import LoginComponent from "./components/Login.vue"
import DettagliEmployee from "./components/DettagliEmployee.vue";
import EmployeesList from "./components/EmployeesList.vue";
import AddEmployee from "./components/AddEmployee.vue";

Vue.use(Router);

export default new Router({
    mode: "history",
    routes: [
        {
            path: '/',
            redirect: {
                name: "login"
            }
        },
        {
            path: "/login",
            name: "login",
            component: LoginComponent
        },
        {
            path: "/employees",
            name: "employees",
            alias: "/employee",
            component: EmployeesList,
        },
        {
            path: "/employees/dettagli/:id",
            name: "employee-dettagli",
            component: DettagliEmployee,
            props: true
        },
        {
            path: "/create",
            name: "create",
            component: AddEmployee
        }
    ]
});
