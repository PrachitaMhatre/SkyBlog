import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl, post } from '../services/Endpoint';
import { RemoveUser } from '../redux/AuthSlice';
import toast from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [islogin, setIsLogin] = useState(false);
  const user = useSelector((state) => state.auth.user);
  //const [updateTrigger, setUpdateTrigger] = useState(0); 

  const handleLogout = async () => {
    try {
      const response = await post("/auth/logout");
      const data = response.data;
  
      if (response.status === 200) {
        localStorage.removeItem("token");
        dispatch(RemoveUser());
        toast.success(data.message);
        navigate("/login");
      }
    } catch (error) {
      console.error("Logout error:", error);
      toast.error("Logout failed. Try again.");
    }
  };

  return (
    <nav className="navbar d-flex justify-content-between   align-items-center p-3">
      <Link to={'/'}><h1 className="mx-5 text-white fs-2 fw-bold">SkyBlog</h1></Link>
      <div className="d-flex align-items-center">
        {!user ? <Link to={'/login'}><button className="btn_sign mx-3">Sign in</button></Link> : (
            <div className="dropdown">
            <div className="avatar-container pointer rounded-circle overflow-hidden bg-info" data-bs-toggle="dropdown" aria-expanded="false" style={{ width: '40px', height: '40px', cursor: "pointer" }}>
              <img 
                className="img-fluid h-100 w-100" 
                src={`${BaseUrl}/images/${user.profile}`}
                alt="Profile"
                style={{objectFit:"cover"}}
              />
            </div>
            <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
              
              {/* <li><span className='text-bold fs-4 dropdown-item'>{user && user.FullName}</span></li> */}
              {user.role == 'admin' ? <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li> :"" }
              <li><Link className="dropdown-item" to={`/profile/${user._id}`}>Profile</Link></li>
              <li><a className="dropdown-item " onClick={handleLogout} style={{cursor:"pointer"}}>Sign Out</a></li>
            </ul>
          </div>
        )}
        
        
      </div>
    </nav>
  );
}
