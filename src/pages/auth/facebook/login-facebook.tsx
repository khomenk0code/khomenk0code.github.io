
import { getAuth, FacebookAuthProvider , signInWithPopup, UserCredential} from 'firebase/auth';
import React, {useContext} from 'react';
import UserContext from "../../../components/login-menu/user-context";

interface GitHubUser {
    displayName: string;
    photoURL: string;
    email: string;
}

interface MyUserCredential extends UserCredential{
    _tokenResponse?: GitHubUser;
}




const FBAuth: React.FC = () => {

    const provider = new FacebookAuthProvider ();
    const auth: any = getAuth();
    auth.languageCode = 'it';
    const {setUser} = useContext(UserContext);

    provider.setCustomParameters({
        'display': 'popup'
    });

    const logWithFB = () => {


        signInWithPopup(auth, provider)
            .then((result: MyUserCredential ) => {
                console.log(result.user.toJSON())
                const user = result.user;
                const credential = FacebookAuthProvider.credentialFromResult(result);
                const accessToken = credential?.accessToken;
                // const user = result._tokenResponse

                // setUser({
                //     name: user?.displayName || result.user.uid,
                //     image: result.user.photoURL || undefined,
                //     email: user?.email,
                // })
            })

            .catch((error) => {
                console.log(error)
                const email = error.customData.email;
                // The AuthCredential type that was used.
                const credential = FacebookAuthProvider.credentialFromError(error)

                console.log(email,credential)
            });
    };




    return (
        <div className="github-login">
            <button onClick={logWithFB}>Facebook</button>
        </div>
    );
};

export default FBAuth;
