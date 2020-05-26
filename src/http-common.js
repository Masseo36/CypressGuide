import axios from "axios";

export default axios.create({
    baseURL: "http://localhost:8080/JerseyHibernateApp/webapi",
    headers: {
        "Content-type": "application/json",
    }
});