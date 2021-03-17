import React, { useState } from 'react';
import firebase from "firebase/app";
import "firebase/auth";
import firebaseConfig from "./firebase.config"

// to ignore the error making the init conditional
if (firebase.apps.length === 0) {
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
}


const Login = () => {

    const [user, setUser] = useState({
        isSignedIn: false,
        name: '',
        email: '',
        photo: '',
        error: ''
    });

    // Create an instance of the Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();


    const handleGoogleSignIn = () => {
        firebase.auth()
            .signInWithPopup(provider)
            .then((result) => {
                // The signed-in user info.
                const {displayName, email, photoURL} = result.user;
                const signedInUser = {
                    isSignedIn: true,
                    name: displayName,
                    email: email,
                    photo: photoURL,
                }
                setUser(signedInUser);
                
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Sign In Error : ", errorCode, errorMessage);
            });
    }


    const handleSignOut = () => {
        firebase.auth()
            .signOut()
            .then((result) => {
                // Sign-out successful.
                const signedInUser = {
                    isSignedIn: false,
                    name: '',
                    email: '',
                    photo: '',
                }
                setUser(signedInUser);
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                console.log("Sign In Error : ", errorCode, errorMessage);
            });
    }

    return (
        <div>
            <h1>Login</h1>
            <button onClick={handleGoogleSignIn}>Sign In with Google</button>
            <button onClick={handleSignOut}>Sign Out</button>
            <div>
                <h2>User Name : {user.name}</h2>
                <h3>Email: {user.email}</h3>
                <img src={user.photo} alt="user photo"/>
            </div>
        </div>
    );
};

export default Login;