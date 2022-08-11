import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { context } from "../App";
import { deleteAuthTokenFromStorage } from "./storages";

export const useSigninNavigate = () => {
    const { user } = useContext(context);
    const [loggedinUser, setLoggedinUser] = user;
    const navigate = useNavigate();

    const handleNavigateSignin = async (route) => {
        await deleteAuthTokenFromStorage();
        await setLoggedinUser({isLoggedIn: false});
        navigate(route);
    }
    return handleNavigateSignin;
}