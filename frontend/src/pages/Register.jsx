import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/Endpoint';
import toast from 'react-hot-toast';

export default function Register() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    fullName: "",
    email: "",
    password: "",
    image: null, 
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setValue({ ...value, image: file });
  };

  const handleImageClick = () => {
    document.getElementById('image').click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('FullName', value.fullName);
    formData.append('email', value.email);
    formData.append('password', value.password);
    formData.append('profile', value.image); 

    try {
      const response = await post('/auth/register', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      const data = response.data;
      if (data.success) {
        console.log(data.message);
        navigate('/login');
        toast.success(data.message);
      }
      console.log('register api', data);
    } catch (error) {
      console.log(error);
      toast.error(error.response?.data?.message || "An unexpected error occurred. Please try again.");
    }
  };

  return (
    <section className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4"> {/* Smaller card width */}
            <div className="card shadow-lg border-0 p-3"
              style={{ 
                backgroundColor: "rgba(0, 0, 0, 0.7)", 
                borderRadius: "10px",
                padding: "25px", 
                margin: "20px auto", 
                maxWidth: "350px" // Smaller width for a compact design
              }}>

              {/* SkyBlog Branding */}
              <h3 className="fw-bold text-center mb-3">
                <span className="text-white">Sky</span>
                <span style={{ color: "#0dcaf0" }}>Blog</span>
              </h3>

              <h6 className="text-center text-muted mb-3">Create an account</h6>

              <form onSubmit={handleSubmit}>

                {/* Profile Picture Upload */}
                <div className="text-center mb-2">
                  <label htmlFor="image" className="form-label text-white">Profile Picture</label>
                  <div className="d-flex justify-content-center">
                    <img 
                      src={value.image ? URL.createObjectURL(value.image) : 'https://img.freepik.com/free-vector/blue-circle-with-white-user_78370-4707.jpg'} 
                      alt="avatar" 
                      className="rounded-circle border border-secondary"
                      width="70" 
                      height="70"
                      style={{ cursor: 'pointer' }}
                      onClick={handleImageClick} 
                    />
                  </div>
                  <input 
                    type="file" 
                    className="form-control d-none"
                    id="image" 
                    accept="image/*" 
                    onChange={handleImageChange} 
                  />
                </div>

                {/* Full Name Field */}
                <div className="mb-2">
                  <label htmlFor="fullName" className="form-label text-white fw-semibold">Full Name</label>
                  <input 
                    type="text" 
                    className="form-control p-2" 
                    id="fullName" 
                    placeholder="John Doe" 
                    required 
                    value={value.fullName} 
                    onChange={(e) => setValue({ ...value, fullName: e.target.value })} 
                  />
                </div>

                {/* Email Field */}
                <div className="mb-2">
                  <label htmlFor="email" className="form-label text-white fw-semibold">Email</label>
                  <input 
                    type="email" 
                    className="form-control p-2" 
                    id="email" 
                    placeholder="name@company.com" 
                    required 
                    value={value.email} 
                    onChange={(e) => setValue({ ...value, email: e.target.value })} 
                  />
                </div>

                {/* Password Field */}
                <div className="mb-2">
                  <label htmlFor="password" className="form-label text-white fw-semibold">Password</label>
                  <input 
                    type="password" 
                    className="form-control p-2" 
                    id="password" 
                    placeholder="••••••••" 
                    required 
                    value={value.password} 
                    onChange={(e) => setValue({ ...value, password: e.target.value })} 
                  />
                </div>

                {/* Sign Up Button */}
                <button type="submit" className="btn btn-primary w-100 mt-2 p-2">Sign up</button>
              </form>

              {/* Already have an account? */}
              <p className="mt-2 text-center text-white">
                Already have an account? <Link to="/login" className="text-primary">Sign in</Link>
              </p>

            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
