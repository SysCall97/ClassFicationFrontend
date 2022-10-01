import axios_instance from "../lib/axios";

export const create = payload => axios_instance.post("/class/create", payload);
export const join = classCode => axios_instance.put(`/class/${classCode}/join`);
export const saveAssignment = ({classCode, payload}) => axios_instance.post(`/class/${classCode}/teachers/assignment`, payload);

export const createPost = ({classCode, payload}) => axios_instance.post(`/class/${classCode}/post`, payload);
export const getPost = ({classCode, page}) => axios_instance.get(`/class/${classCode}/post?page=${page}&limit=10`);
export const updatePost = ({classCode, postId, payload}) => axios_instance.put(`/class/${classCode}/post/${postId}`, payload);
export const deletePost = ({classCode, postId}) => axios_instance.delete(`/class/${classCode}/post/${postId}`);

export const createComment = ({classCode, postId, payload}) => axios_instance.post(`/class/${classCode}/post/${postId}/comment`, payload);
export const getComments = ({classCode, postId}) => axios_instance.get(`/class/${classCode}/post/${postId}/comment`);
export const updateComment = ({classCode, postId, commentId, payload}) => axios_instance.put(`/class/${classCode}/post/${postId}/comment/${commentId}`, payload);
export const deleteComment = ({classCode, postId, commentId}) => axios_instance.delete(`/class/${classCode}/post/${postId}/comment/${commentId}`);

export const getStudents = ({classCode, page}) => axios_instance.get(`/class/${classCode}/students?page=${page}&limit=10`);
export const getTeachers = ({classCode, page}) => axios_instance.get(`/class/${classCode}/teachers?page=${page}&limit=10`);
export const getAssignments = ({classCode, page, type, status}) => axios_instance.get(`/class/${classCode}/${type}/assignment?status=${status}&page=${page}&limit=10`);
export const getAssignmentLink = ({classCode, assignmentId}) => axios_instance.get(`/class/${classCode}/assignments/${assignmentId}`);

export const submitAssignment = ({classCode, assignmentId, payload}) => axios_instance.post(`/class/${classCode}/students/assignment/${assignmentId}/submission`, payload);
export const saveMark = ({ submissionId, payload, assignmentId, classCode }) => axios_instance.patch(`/class/${classCode}/students/assignment/${assignmentId}/submission/${submissionId}`, payload);
export const getSubmissionLink = ({classCode, assignmentId, submissionId}) => axios_instance.get(`/class/${classCode}/assignments/${assignmentId}/submission/${submissionId}`);