import React, { useState } from 'react'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import {setDoc, doc} from "firebase/firestore"
import {auth, firestore } from '../firebase'

export default function Register() {

const [fname, setFname] = useState("default")
const [lname, setLname] = useState("default")
const [email, setEmail] = useState("default")
const [password, setPassword] = useState("default")

const handleRegister = async (e)=>{
    e.preventDefault();
    try{
        await createUserWithEmailAndPassword(auth, email, password)
        const user = auth.currentUser;
        console.log(user);

        if (user){
            await setDoc(doc(firestore, "Users", user.uid), {
                email: user.email,
                firstName: fname,
                lastName: lname,
            });
        }

        console.log("User Successfully Registerd")
    } 
    catch (error)
    {
        console.log(error.message);
    }
};

  return (
    <form onSubmit = {handleRegister}>
        <h1>Register</h1>

    <label>First name</label>
    <input
        type = "text"
        placeholder = "Insert First name"
        onChange = {(e) => setFname(e.target.value)}
    />
    
    <label>Last name</label>
    <input
        type = "text"
        placeholder = "Insert Last name"
        onChange = {(e) => setLname(e.target.value)}
    />

    <label>Email</label>
    <input
        type = "text"
        placeholder = "Insert Email"
        onChange = {(e) => setEmail(e.target.value)}
    />

    <label>Password</label>
    <input
        type = "text"
        placeholder = "Insert Password"
        onChange = {(e) => setPassword(e.target.value)}
    />

    <button>Register</button>
    <a href='/login'>Login</a>
    </form>



  )
}
