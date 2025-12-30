import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, firestore } from '../firebase';
import { useState } from 'react';
import { doc, getDoc } from 'firebase/firestore';



export default function Login() {

const [email, setEmail] = useState("default")
const [password, setPassword] = useState("default")


const handleLogin = async (e) => {
    e.preventDefault()

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password)
      const user = userCredential.user

      if (!user.emailVerified) {
        alert("Please verify your email first.")
        return
      }

      const userDoc = await getDoc(doc(firestore, "Users", user.uid)) //details ng user

      if (!userDoc.exists()) {
        console.log("User data not found")
      }

      const role = userDoc.data().role

      if (role === "admin") {
        window.location.href = "/admin"
      } else {
        window.location.href = "/profile"
      }


    } catch (error) {
      alert("Invalid credentials")
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
