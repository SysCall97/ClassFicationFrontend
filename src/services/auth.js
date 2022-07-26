import axios_instance from "../lib/axios";

export const signin = payload => axios_instance.post('/auth/signin', payload);
export const signout = () => axios_instance.post('/auth/signout');