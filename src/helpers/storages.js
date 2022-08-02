import instance from "../lib/axios";

export const getAuthTokenFromStorage = () => {
    return new Promise((resolve) => resolve(localStorage.getItem("tid")));
};

export const setUserToStorage = ({token, message, ...user}) => {
    return new Promise((resolve) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("tid", token);
        localStorage.setItem("isLoggedIn", true);
        instance.defaults.headers["Authorization"] = `Bearer ${token}`;
        resolve(true);
    });
};

export const deleteAuthTokenFromStorage = () => {
    return new Promise((resolve) => {
        localStorage.setItem("user", JSON.stringify({}));
        localStorage.removeItem("tid");
        localStorage.setItem("isLoggedIn", false);
        instance.defaults.headers["Authorization"] = `Bearer null`;
        resolve(true);
    });
};