import { useEffect, useState } from "react"
import { auth, firestore } from "../firebase"
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore"

export default function Admin() {

  const [users, setUsers] = useState([])
  const [selectedUser, setSelectedUser] = useState(null)
  const [currentAdmin, setCurrentAdmin] = useState(null)

  useEffect(() => {
    fetchAdminData()
  }, [])

  const fetchAdminData = async () => {
    auth.onAuthStateChanged(async (user) => {

      if (!user || !user.emailVerified) {
        window.location.href = "/login"
        return
      }

      const adminRef = doc(firestore, "Users", user.uid)
      const adminSnap = await getDoc(adminRef)

      if (!adminSnap.exists() || adminSnap.data().role !== "admin") {
        window.location.href = "/profile"
        return
      }

      // ✅ save logged-in admin info
      setCurrentAdmin(adminSnap.data())

      // 🔹 fetch all users except yourself
      const usersSnapshot = await getDocs(collection(firestore, "Users"))
      const usersList = []

      usersSnapshot.forEach((docSnap) => {
        if (docSnap.id === user.uid) return // 🚫 skip yourself

        usersList.push({ id: docSnap.id, ...docSnap.data() })
      })

      setUsers(usersList)
    })
  }

  const handleSave = async () => {
    if (!selectedUser) return

    const userRef = doc(firestore, "Users", selectedUser.id)

    await updateDoc(userRef, {
      firstName: selectedUser.firstName,
      lastName: selectedUser.lastName,
      role: selectedUser.role
    })

    alert("User updated")

    setSelectedUser(null)
    fetchAdminData()
  }

  async function handleLogout(){
    try{
      await auth.signOut()
      window.location.href = "/login"
    } catch (error) {
      console.error("Error logging out", error.message)
    }
  }

  return (
    <div>
      {currentAdmin && (
        <>
          <p>Welcome {currentAdmin.firstName} ({currentAdmin.role})</p>
          <p>Email {currentAdmin.email}</p>
        </>
      )}

      <button onClick={handleLogout}>Logout</button>

      {/* USERS LIST */}
      <ul>
        {users.map(user => (
          <li
            key={user.id}
            style={{ cursor: "pointer" }}
            onClick={() => setSelectedUser(user)}
          >
            {user.email} ({user.role})
          </li>
        ))}
      </ul>

      {/* EDIT USER */}
      {selectedUser && (
        <div>
          <h2>Edit User</h2>

          <label>First Name</label>
          <input
            value={selectedUser.firstName}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                firstName: e.target.value
              })
            }
          />

          <label>Last Name</label>
          <input
            value={selectedUser.lastName}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                lastName: e.target.value
              })
            }
          />

          <label>Role</label>
          <select
            value={selectedUser.role}
            onChange={(e) =>
              setSelectedUser({
                ...selectedUser,
                role: e.target.value
              })
            }
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <button onClick={handleSave}>Save</button>
          <button onClick={() => setSelectedUser(null)}>Cancel</button>
        </div>
      )}
    </div>
  )
}
