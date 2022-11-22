import axios_instance from "../lib/axios";

export const create = ({payload, classCode}) => axios_instance.post(`session/class/${classCode}`, payload);