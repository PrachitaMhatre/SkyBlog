import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom'
import Navbar from '../Components/Navbar'
import Sidebar from '../Components/Sidebar.jsx'
import { useSelector } from 'react-redux'


export default function AdminLayout() {
  const navigate=useNavigate()
  const user=useSelector((state)=>state.auth.user)
  console.log('user from redux',user)

  useEffect(()=>{

    if (!user) {
      navigate('/')
    }
 else if ( user.role !=='admin') {
      navigate('/')
  }




  },[user,navigate])
  return (
    <>
    <Navbar/>
    <div className="d-flex">
      <Sidebar />
      <div className="content flex-grow-1 p-4">
        
    <Outlet/>
       
      </div>
    </div>
    
    
    
    </>
  )
}