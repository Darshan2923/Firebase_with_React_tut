import React, { useState } from 'react'
import { auth } from '../config/firebase-config'
import { createUserWithEmailAndPassword } from 'firebase/auth'

function Auth() {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    console.log(auth?.currentUser?.email)
    // ? mark for existing baar baar rerender naa ho nai toh console me error aayega
    const signIn = async () => {
        try {

            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.log(err);
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
                <button onClick={signIn}>SingUp</button>
            </div>
        </section>
    )
}

export default Auth