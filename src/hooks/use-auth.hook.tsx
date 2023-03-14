import {getAuth, GithubAuthProvider, FacebookAuthProvider, signInWithPopup, type UserCredential} from 'firebase/auth';
import {useCallback, useContext} from 'react';
import {useGoogleLogin} from '@react-oauth/google';
import axios from 'axios';
import UserContext from '../components/menu/portal/portal.context';

type MyUserCredential = {
	_tokenResponse?: {
		displayName?: string;
		photoURL?: string;
		email?: string;
	};
} & UserCredential;

interface IAuth {
	authWithGoogle: () => void;
	authWithFacebook: () => void;
	authWithGithub: () => void;
}

// Hook for authentication that returns IAuth interface
const useAuthHook = (): IAuth => {

	// Get Firebase authentication instance
	const auth = getAuth();
	const {setUser} = useContext(UserContext);
	//callback that logs in with a GitHub or Facebook provider and updates the user context on successful login
	const loginWithFirebase = useCallback((
		provider: GithubAuthProvider | FacebookAuthProvider
	) => {
		// Set custom parameters
		provider.setCustomParameters({
			display: 'popup',
		});
		// Sign in with the provider using Firebase auth and update the user context with user information
		signInWithPopup(auth, provider)
			.then((result: MyUserCredential) => {
				const user = result._tokenResponse;

				setUser({
					name: user?.displayName ?? result.user.uid,
					image: result.user.photoURL ?? undefined,
					email: user?.email,
				});
			})
			.catch(error => {
				console.error(`Error logging in with ${provider.providerId}: ${error.message}`);
			});
	}, [auth, setUser]);


	const authWithFacebook = () => {
		const provider = new FacebookAuthProvider();
		provider.setCustomParameters({
			display: 'popup',
		});
		loginWithFirebase(provider);
	};

	const authWithGithub = () => {
		const provider = new GithubAuthProvider();
		loginWithFirebase(provider);
	};


	// Get Google authentication response using @react-oauth/google hook and call getUserInfo function with the access token
	const authWithGoogle = useGoogleLogin({
		onSuccess(codeResponse) {
			getUserInfo(codeResponse.access_token);
		},
	});


	//callback that logs in with a Google and updates the user context on successful login
	const getUserInfo = useCallback(async (token: string) => {
		try {
			const response = await axios.get('https://www.googleapis.com/oauth2/v1/userinfo', {
				headers: {
					Authorization: `Bearer ${token}`,
				},
			});
			const { name, email, picture } = response.data;
			setUser({ name, email, image: picture });
		} catch (error:any) {
			console.error(`Error getting user info from Google: ${error.message}`);
		}
	}, [setUser]);

	return {
		authWithGoogle,
		authWithFacebook,
		authWithGithub,
	};
};

export default useAuthHook;
