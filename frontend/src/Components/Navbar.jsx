import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { BaseUrl, post } from '../services/Endpoint';
import { RemoveUser } from '../redux/AuthSlice';
import toast from 'react-hot-toast';

export default function Navbar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.user);

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
    <nav className="navbar navbar-expand-lg navbar-dark fixed-top shadow-lg" style={{ 
      background: "rgba(0, 0, 0, 0.7)", 
      backdropFilter: "blur(10px)", 
      padding: "10px 20px" 
    }}>
      <div className="container-fluid">
        {/* ✅ Brand Name */}
        <Link to="/" className="navbar-brand fs-2 fw-bold text-white">
          Sky<span style={{ color: "#0dcaf0" }}>Blog</span>
        </Link>

        {/* ✅ Responsive Toggle Button */}
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* ✅ Navigation Links */}
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          <ul className="navbar-nav align-items-center">
            {!user ? (
              <li className="nav-item">
                <Link to="/login" className="btn btn-outline-info px-4 py-2 mx-2 fw-bold">
                  Sign In
                </Link>
              </li>
            ) : (
              <li className="nav-item dropdown">
                <div className="avatar-container rounded-circle overflow-hidden" 
                  data-bs-toggle="dropdown" 
                  aria-expanded="false" 
                  style={{ width: "45px", height: "45px", cursor: "pointer", border: "2px solid #0dcaf0", boxShadow: "0px 0px 10px rgba(13, 202, 240, 0.5)" }}>
                  <img 
                    className="img-fluid h-100 w-100" 
                    src={`${BaseUrl}/images/${user.profile}`} 
                    alt="Profile" 
                    style={{ objectFit: "cover", borderRadius: "50%" }}
                  />
                </div>
                <ul className="dropdown-menu dropdown-menu-end dropdown-menu-dark">
                  {user.role === 'admin' && <li><Link className="dropdown-item" to="/dashboard">Dashboard</Link></li>}
                  <li><Link className="dropdown-item" to={`/profile/${user._id}`}>Profile</Link></li>
                  <li>
                    <button className="dropdown-item text-danger fw-bold" onClick={handleLogout}>
                      Sign Out
                    </button>
                  </li>
                </ul>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}
