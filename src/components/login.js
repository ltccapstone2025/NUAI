import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebase';
import { useState } from 'react';


export default function Login() {

const [email, setEmail] = useState("default")
const [password, setPassword] = useState("default")

const handleLogin = async (e) => {
    e.preventDefault();
    try {
        await signInWithEmailAndPassword (auth, email, password)
        console.log("User Login Successfully")
        window.location.href = "/profile"
        
    } catch (error) {
        console.log("Error Login")
    }
}
    

  return (
    <form onSubmit = {handleLogin}>
        <h1>Login</h1>

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

    <button>Login</button>

    <a href = "/register">Register</a>
    
    </form>

  )
}
