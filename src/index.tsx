import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import MainComponent from './pages/main/main.component';
import {Routes, Route} from 'react-router';
import CharacterInfo from './pages/character-info/character-info.component';
import {BrowserRouter} from 'react-router-dom';
import {GoogleOAuthProvider} from '@react-oauth/google';
import UserProvider from './components/menu/portal/portal.provider';
import LoginPortal from './components/menu/portal/portal.component';
import {initializeApp} from 'firebase/app';

const root = ReactDOM.createRoot(
	document.getElementById('root')!,
);

initializeApp({
	apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
	projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
	authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
});

root.render(
	<BrowserRouter>
		<GoogleOAuthProvider clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID!}>
			<UserProvider>
				<Routes>
					<Route path='/' element={<MainComponent/>}/>
					<Route path='/character-info/:id' element={<CharacterInfo />} />
				</Routes>
				<LoginPortal/>
			</UserProvider>
		</GoogleOAuthProvider>
	</BrowserRouter>,

);
