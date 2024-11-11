import { useState } from "react"
import { auth, googleProvider } from "../config/firebase"
import { createUserWithEmailAndPassword, signInWithPopup, signOut } from "firebase/auth"

export const Auth = () => {
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
   
    console.log(auth?.currentUser?.email);

    const signIn = async () =>{
        try {
            await createUserWithEmailAndPassword(auth,email,password)
        } catch (error) {
            console.log(error);
        }

        
    }

    const signInwithGoogle = async () => {
        try {
            await signInWithPopup(auth,googleProvider)
        } catch (error) {
            console.log(error);
        }
    }

    const logOut = async () => {
        try {
            await signOut(auth)
        } catch (error) {
            console.log(error);
        }
    }


    return (
        <div>
            <input type="email"  placeholder="enter email.." onChange={(e)=>setEmail(e.target.value)} />
            <input type="password" placeholder="password" onChange={(e)=>setPassword(e.target.value)} />
            <button onClick={signIn}>Signin</button>

            <button onClick={signInwithGoogle}>SignIN With Google</button>
            <button onClick={logOut} >logOut</button>
        </div>
    )
}