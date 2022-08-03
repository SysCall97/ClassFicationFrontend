import { useContext } from "react";
import { context } from "../App";
import { setUserToStorage } from "./storages";

export const useHandleAuth = () => {
    const { user } = useContext(context);
    const [loggedinUser, setLoggedinUser] = user;

    const handleAuth = async (payload, authFunc, loadingFunc) => {
        if(typeof(loadingFunc) === 'function') loadingFunc(true);
        try {
            const data = await authFunc(payload);
            if(typeof(loadingFunc) === 'function') loadingFunc(false);
            const _user = data.data;
            await setUserToStorage(_user);
            await setLoggedinUser({..._user, isLoggedIn: true});
            return {isSuccess: true}
        } catch (error) {
            if(typeof(loadingFunc) === 'function') loadingFunc(false);
            return {
                isSuccess: false,
                title: error.response.statusText, 
                message: error.response.data.message
            };
        }
    }
    return handleAuth;
}