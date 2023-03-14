import React, {useState, useEffect, useRef, useContext} from 'react';

import './login-menu.scss';
import GoogleAuth from "../../pages/auth/google/login-google";
import UserContext, {User} from "./user-context";
import GitHubAuth from "../../pages/auth/git-hub/login-github";
import FBAuth from "../../pages/auth/facebook/login-facebook";


function LoginMenu(): JSX.Element {

    const {user, resetUser, isLoginShow, closeLoginForm, setUser} = useContext(UserContext);
    const handleSuccess = (user: User) => {
        setUser(user);
    }

    const handleLogoutClick = () => {
        resetUser();
    }

    const handlePropagation = (event: React.MouseEvent<HTMLDivElement>) => {
        event.stopPropagation()
    }

    return (
        <div className="full-screen-wrapper" onClick={closeLoginForm}>
            <div className={`login-menu ${isLoginShow ? 'open' : ''}`} onClick={handlePropagation}>
                <div className="user-info">
                    {user ? (
                        <>
                            {user?.image && <img src={user?.image} alt="User avatar"/>}
                            <p className="user-name">{user.name}</p>
                            <p className="user-email">{user?.email}</p>
                            <a onClick={handleLogoutClick}>
                                Logout
                            </a>
                        </>
                    ) : (
                        <div className="login-buttons-wrapper">
                            <p>Login with</p>
                            <GoogleAuth onSuccess={handleSuccess}/>
                            <GitHubAuth/>
                            <FBAuth/>
                        </div>)}
                    <button className="login-button" onClick={closeLoginForm}>
                        Close
                    </button>

                </div>

            </div>
        </div>
    )


    // return (
    //     <div className={`login-menu ${isMenuOpen ? 'open' : ''}`}  >
    //         {user ? (
    //             <div className="user-info">
    //                     {user?.image && <img src={user?.image} alt="User avatar" />}
    //                     <p className="user-name" >{user.name}</p>
    //                     <p className="user-email" >{user?.email}</p>
    //             </div>
    //         ) : (
    //             <div className="login-menu-dropdown" >
    //                 <div className="login-menu-block" >
    //                     <GoogleAuth />
    //                     <button className="login-menu-option">Login 2</button>
    //                     <button className="login-menu-option">Login 3</button>
    //                 </div>
    //             </div>
    //         )}
    //
    //         {user ?
    //               <button className="logout-menu-button" onClick={resetUser}>Logout</button>
    //             : <button className="login-menu-button" onClick={handleMenuOpenClick}>Login</button>
    //         }
    //     </div>
    // );

}

export default LoginMenu;