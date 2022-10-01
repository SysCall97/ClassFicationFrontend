import axios from "axios";
import { baseURL } from "./domain";

const instance = axios.create({
	baseURL: baseURL,
	headers: { Authorization: "Bearer " + localStorage.tid },
});

export default instance;
