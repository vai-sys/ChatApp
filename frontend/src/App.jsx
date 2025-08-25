import { useState,useEffect } from 'react'
import { Navigate, Route,Routes } from  'react-router-dom'

import './App.css'
import Navbar from './components/Navbar'
import HomePage from './pages/HomePage'
import {useAuthStore } from "./auth/Auth" 
import SignUpPage from  "./pages/SignUpPage"
import LoginPage from "./pages/LoginPage"
import SettingsPage from "./pages/SettingsPage"
import ProfilePage from "./pages/ProfilePage"
import {Loader} from "lucide-react"
function App() {
  const {authUser ,checkAuth,isCheckingAuth}=useAuthStore();
   useEffect(()=>{
    checkAuth();
  },[]);

  console.log(authUser);
  if(isCheckingAuth && !authUser) return (
    <div className="flex items-center justify-center h-screen">
      <Loader className="size-10 animate-spin" />
    </div>
  )

  return (
    <div>
      <Navbar/>
      <Routes>
        <Route path="/" element={
          authUser ? <HomePage/> : <Navigate to="/login"/>
        }/>
        <Route path="/signup" element={
          !authUser ? <SignUpPage/> : <Navigate to="/"/>
        }/>
        <Route path="/login" element={
         !authUser ? <LoginPage/> : <Navigate to="/"/>
        }/>
        <Route path="/settings" element={
          authUser ? <SettingsPage/> : <Navigate to="/login"/>
        }/>
        <Route path="/ProfilePage" element={
           authUser ? <ProfilePage/> : <Navigate to="/login"/>
        }/>
      </Routes>
     
    </div>
      
  )
}

export default App
