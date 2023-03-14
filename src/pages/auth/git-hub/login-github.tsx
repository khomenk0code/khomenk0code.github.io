
import { getAuth, GithubAuthProvider, signInWithPopup, UserCredential} from 'firebase/auth';
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




const GitHubAuth: React.FC = () => {

    const provider = new GithubAuthProvider();
    const auth: any = getAuth();
    const {setUser} = useContext(UserContext);

    const logWithGit = () => {


        signInWithPopup(auth, provider)
            .then((result: MyUserCredential ) => {
                console.log(result.user.toJSON())
                const user = result._tokenResponse

                setUser({
                    name: user?.displayName || result.user.uid,
                    image: result.user.photoURL || undefined,
                    email: user?.email,
                })
            })

            .catch((error) => {
                console.log(error)
            });
    };

    return (
        <div className="github-login">
            <button onClick={logWithGit}>Github</button>
        </div>
    );
};

export default GitHubAuth;
