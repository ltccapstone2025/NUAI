import './App.css';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom";
import { auth } from './firebase';
import { useEffect, useState } from 'react';
import Admin from './components/pages/admin/Admin';
import AlumniProfile from './components/pages/alumni/AlumniProfile';
import AnalyzeResume from './components/pages/alumni/AnalyzeResume';
import LoginPage from './components/pages/alumni/LoginPage';
import RegisterAlumni from './components/pages/alumni/RegisterAlumni';



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
          <Route path = "/" element={user? <Navigate to = "/profile"/> : <LoginPage/>} />
          <Route path = "/login" element={<LoginPage/>} />
          <Route path = "/register" element={<RegisterAlumni/>} />
          <Route path = "/profile" element={<AlumniProfile/>} />
          <Route path = "/analyze-resume" element={<AnalyzeResume/>} />
          <Route path = "/admin" element={<Admin/>}/>
        </Routes>
      </Router>
      
    </div>
  );
}

export default App;
