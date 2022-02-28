import LoginPage from "./components/LoginPage";
import RegisterPage from "./components/RegisterPage";
import { BrowserRouter, Route, Routes, Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import HomePage from "./components/HomePage";
import CreatePost from "./components/CreatePost";
import ParticularPost from "./components/ParticularPost";

function App() {

  const [user, setUser] = useState()

  useEffect(async () => { setUser(JSON.parse(localStorage.getItem('user'))) }, [])

  console.log(user)

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Navigate to="/login" />} />
          <Route path='/login' element={user ? <Navigate to="/homepage" /> : <LoginPage />} />
          <Route path='/register' element={<RegisterPage />} />
          <Route path='/homepage' element={user ? <HomePage user={user} /> : <Navigate to="/login" />} />
          <Route path='/homepage/:id' element={user ? <ParticularPost user={user} /> : <Navigate to="/login" />} />
          <Route path='/create_post' element={user ? <CreatePost user={user} /> : <Navigate to="/login" />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
