import './App.css';
import Register from './components/register';
import Login from './components/login';
import Profile from './components/profile';
import Admin from './components/admin';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { auth } from './firebase';
import { useEffect, useState } from 'react';





function App() {
  const [user, setUser] = useState();
  useEffect(()=>{
    auth.onAuthStateChanged((user) => {
      setUser(user);
    })
  })
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path = "/" element={user? <Navigate to = "/profile"/> : <Login/>} />
          <Route path = "/login" element={<Login/>} />
          <Route path = "/register" element={<Register/>} />
          <Route path = "/profile" element={<Profile/>} />
          <Route path = "/admin" element={<Admin/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
