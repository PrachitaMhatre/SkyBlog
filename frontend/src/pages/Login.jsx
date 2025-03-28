import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { post } from '../services/Endpoint';
import { useDispatch } from 'react-redux';
import toast from 'react-hot-toast';
import { setUser } from '../redux/AuthSlice';

export default function Login() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [value, setValue] = useState({
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setValue({
            ...value,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await post('/auth/login', value);
            const data = response.data; 
            
            console.log("Login success:", data);

            if (response.status === 200) { 
                dispatch(setUser(data.user));
                navigate('/');
                toast.success(data.message);
            }
        } catch (error) {
            console.error("Login error:", error);

            if (error.response && error.response.data && error.response.data.message) {
                toast.error(error.response.data.message);
            } else {
                toast.error("An unexpected error occurred. Please try again.");
            }
        }
    };

    return (
        <section className="bg-light d-flex align-items-center justify-content-center min-vh-100">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-md-5">
                        <div className="card shadow-sm border-0">
                            <div className="card-body p-4 text-white" style={{ backgroundColor: "rgba(0, 0, 0, 0.7)", borderRadius: "8px" }}>
                                
                                {/* Stylish SkyBlog Name */}
                                <h2 className="fw-bold mb-3 text-center">
                                    <span className="text-white">Sky</span>
                                    <span style={{ color: "#0dcaf0" }}>Blog</span>
                                </h2>
                                
                                <h5 className="text-center mb-4">Sign in to your account</h5>
                                
                                <form onSubmit={handleSubmit}>
                                    <div className="mb-3">
                                        <label htmlFor="email" className="form-label fw-semibold">Email</label>
                                        <input
                                            type="email"
                                            name="email"
                                            onChange={handleChange}
                                            className="form-control"
                                            id="email"
                                            placeholder="name@example.com"
                                            required
                                            value={value.email}
                                        />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="password" className="form-label fw-semibold">Password</label>
                                        <input
                                            type="password"
                                            onChange={handleChange}
                                            value={value.password}
                                            name="password"
                                            className="form-control"
                                            id="password"
                                            placeholder="Enter your password"
                                            required
                                        />
                                    </div>
                                    <button type="submit" className="btn btn-primary w-100 mt-2">Sign in</button>
                                </form>

                                <p className="mt-3 text-center">
                                    Don’t have an account yet? <Link to="/register" className="text-primary">Sign up</Link>
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
