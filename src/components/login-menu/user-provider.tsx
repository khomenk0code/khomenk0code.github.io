import React, {useState} from "react";
import UserContext, {User} from "./user-context";

const USER_KEY = 'user';

const UserProvider: React.FC<{children: React.ReactNode}> = ({children}) => {
    const [user, setUser] = useState<User | null>(
        localStorage.getItem(USER_KEY)
            ? JSON.parse(localStorage.getItem(USER_KEY) as string)
            : null
    );
    const [isLoginShow, setIsLoginShow] = useState(false);

    const resetUser = () => {
        localStorage.removeItem(USER_KEY);
        setUser(null)
    };

    const updateUser = (user: User) => {
        localStorage.setItem(USER_KEY, JSON.stringify(user));
        setUser(user)
    };

    const openLoginForm = () => {
        setIsLoginShow(true)
    };

    const closeLoginForm = () => {
        setIsLoginShow(false)
    };


    return (
        <UserContext.Provider
            value={{user, isLoginShow, resetUser, setUser: updateUser, openLoginForm, closeLoginForm}}
        >
            {children}
        </UserContext.Provider>
    )
}

export default UserProvider;