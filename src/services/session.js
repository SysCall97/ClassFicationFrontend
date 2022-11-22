import axios_instance from "../lib/axios";

export const create = ({payload, classCode}) => axios_instance.post(`session/class/${classCode}`, payload);
export const getSessions = ({ classCode, page }) => axios_instance.get(`session/class/${classCode}?page=${page}&limit=10`);
export const getSessionCode = ({ classCode, sessionId }) => axios_instance.get(`session/${sessionId}/class/${classCode}`);