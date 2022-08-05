import axios_instance from "../lib/axios";

export const signup = payload => axios_instance.post('/user/signup', payload);
export const update = payload => axios_instance.put('/user/update', payload);
export const getClassList = () => axios_instance.get('/user/class_list');