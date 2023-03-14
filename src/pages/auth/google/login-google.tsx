import React, { useCallback } from "react";
import { useGoogleLogin } from '@react-oauth/google';
import axios from "axios";
import './login-google.scss'
import {User} from "../../../components/login-menu/user-context";




 const GoogleAuth: React.FC<{onSuccess: (user: User) => void;}> = (props) => {

    const getToken = useGoogleLogin({
        onSuccess: codeResponse => {
            getUserInfo(codeResponse.access_token);
        },
    });


    const getUserInfo = useCallback((token:string) => {
        axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
            .then(response => {
                props.onSuccess({
                    name: response.data.name,
                    email: response.data.email,
                    image: response.data.picture,
                });
            })
            .catch(error => {
                console.error(error);
            });
    }, [props.onSuccess]);



    return (
        <div className="google-login">
            <button onClick={() => getToken()}>
                Google
            </button>
        </div>


    );

};

export default GoogleAuth;
