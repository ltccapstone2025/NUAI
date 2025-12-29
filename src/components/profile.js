import { useEffect, useState } from "react";
import { auth, firestore } from "../firebase";
import { doc, getDoc } from "firebase/firestore";


export default function Profile() {

const [userDetails, setUserDetails] = useState(null)
const fetchUserData = async () => {

    auth.onAuthStateChanged(async (user) => {
        console.log(user);
        const docRef = doc(firestore, "Users", user.uid)
        const docSnap = await getDoc(docRef);

        if (!user || !user.emailVerified) {
        window.location.href = "/login"
        return
        }
        if (docSnap.exists()){
            setUserDetails(docSnap.data());
            console.log(docSnap.data());
        }
        else
        {
            //if user does not exist
            window.location.href = "/login"
        }
    })
};

async function handleLogout(){
    try{
        await auth.signOut()
        window.location.href = "/login"
        console.log("User logged out successfully!")

    } 
    catch (error) {
        console.error ("Error logging out", error.message)
    }
}

useEffect(() => {
    fetchUserData();
}, [])


  return (
    <div>
    {userDetails ? (
        <>
            <p>Welcome {userDetails.firstName}</p>
            <p>Email {userDetails.email}</p>
            <button onClick = {handleLogout}>Logout</button>
        </>
    ) : (
        <p>Loading...</p>
    )}
    </div>
  )
}

