import React from 'react'
import { useAuthStore } from '../auth/Auth';

const Navbar = () => {
   const {authUser}=useAuthStore();
  return (
    <div>
        navbr
      
    </div>
  )
}

export default Navbar
