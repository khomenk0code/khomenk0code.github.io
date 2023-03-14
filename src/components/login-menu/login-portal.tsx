import React, {useContext} from 'react';
import ReactDOM from 'react-dom';
import LoginMenu from "./login-menu";
import './login-portal.scss'
import userContext from "./user-context";

const LoginPortal = () => {
    const {isLoginShow, closeLoginForm, openLoginForm, user} = useContext(userContext)

    return ReactDOM.createPortal(
        <>
            <div className={`login-portal ${isLoginShow ? 'show' : ''}`}>
                <LoginMenu/>
            </div>
            {!isLoginShow && !user &&
                <button className="login-button" onClick={openLoginForm}>
                    Login
                </button>
            }
            {user && !isLoginShow &&
                <button className="login-button" onClick={openLoginForm}>
                    {user.name}
                </button>
            }
        </>

       ,
        document.getElementById('login-portal-root') as HTMLElement
    );
}

export default LoginPortal;
