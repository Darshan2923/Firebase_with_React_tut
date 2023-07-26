import React, { useState } from 'react'
import { auth, gprovider } from '../config/firebase-config'
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth'

function Auth() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.log(auth?.currentUser?.email)
    console.log(auth?.currentUser?.photoURL)
    // ? mark for existing baar baar rerender naa ho nai toh console me error aayega
    const signIn = async () => {
        try {

            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(error);
        }
    };
    const signInwithGoogle = async () => {
        try {

            await signInWithPopup(auth, gprovider);
        } catch (error) {
            console.log(error);
        }
    };
    const logout = async () => {
        try {

            await signOut(auth);
        } catch (error) {
            console.log(error);
        }
    };
    return (
        <section id="authentication">
            <div className="auth-container">
                <input
                    type="text" placeholder='Email...'
                    onChange={(e) => setEmail(e.target.value)} />
                <input
                    type="password" placeholder='Password...'
                    onChange={(e) => setPassword(e.target.value)} />
                <button onClick={signIn}>Sign In</button>
                <button onClick={signInwithGoogle}>SignIn With Google</button>
                <button onClick={logout}>Log Out</button>
            </div>
        </section>
    )
}

export default Auth