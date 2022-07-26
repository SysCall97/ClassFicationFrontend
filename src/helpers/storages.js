import instance from "../lib/axios";

export const getAuthTokenFromStorage = () => {
    return new Promise((resolve) => resolve(localStorage.getItem("tid")));
};

export const setAuthTokenToStorage = (token) => {
    return new Promise((resolve) => {
        localStorage.setItem("tid", token);
        instance.defaults.headers["Authorization"] = `Bearer ${token}`;
        resolve(true);
    });
};

export const deleteAuthTokenFromStorage = () => {
    return new Promise((resolve) => {
        localStorage.removeItem("tid");
        instance.defaults.headers["Authorization"] = `Bearer null`;
        resolve(true);
    });
};