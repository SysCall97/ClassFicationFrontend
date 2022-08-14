import axios from "axios";

const instance = axios.create({
	baseURL: "http://localhost:5000/api/v1",
	// baseURL: "https://class-fication-backend.herokuapp.com/api/v1",
	headers: { Authorization: "Bearer " + localStorage.tid },
});

export default instance;
