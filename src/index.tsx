import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import Main from './pages/main/main';
import {Routes, Route} from 'react-router';
import CharacterInfo from '../src/pages/character-info/character-info'
import {BrowserRouter} from "react-router-dom"
import { GoogleOAuthProvider } from '@react-oauth/google';
import UserProvider from "./components/login-menu/user-provider";
import LoginPortal from "./components/login-menu/login-portal";
import {initializeApp} from "firebase/app";

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

initializeApp({
    apiKey: "AIzaSyAuMqkV_zvYjK7IiQMG4uRZwZOUqi-VMDY",
    projectId: "optimum-monitor-380016",
    authDomain: "optimum-monitor-380016.firebaseapp.com"

})

root.render(
    <GoogleOAuthProvider clientId="60036572759-a92sqmtsbecp13jtrch7pah2qu2jkib9">
        <BrowserRouter>
            <UserProvider>
                   <Routes>
                       <Route path="/" element={<Main/>}/>
                       <Route path="/character-info/:id" element={<CharacterInfo />} />
                   </Routes>
                <LoginPortal/>
            </UserProvider>
        </BrowserRouter>
    </GoogleOAuthProvider>
);
