import React, { useState, useEffect } from "react"; 
import { get } from "../../services/Endpoint.js";


export default function Dashboard() {
    const [totalUsers, setTotalUsers] = useState(0);
    const [totalPosts, setTotalPosts] = useState(0);
    const [totalComments, setTotalComments] = useState(0);

    const [loadedata, setLoadedata] = useState(false);

    useEffect(() => {
        const GetData = async () => {
            try {
                const response = await get('/dashboard');
                const data = response.data;
                
                setTotalUsers(data.totalUsers || 0);
                setTotalPosts(data.totalPosts || 0);
                setTotalComments(data.totalComments || 0);
                
                console.log("Dashboard Data:", data);
            } catch (error) {
                console.error("❌ Error fetching dashboard data:", error);
            }
        };
        GetData();
    }, [loadedata]);

    return (
        <div>
            <h2 className="mb-4 text-black">Dashboard</h2>
            <div className="row">
                <div className="col-md-4">
                    <div className="card bg-primary text-white mb-4">
                        <div className="card-body">
                            <h5 className="card-title">👥 Total Users</h5>
                            <p className="card-text">{totalUsers}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-success text-white mb-4">
                        <div className="card-body">
                            <h5 className="card-title">📰 Total Posts</h5>
                            <p className="card-text">{totalPosts}</p>
                        </div>
                    </div>
                </div>
                <div className="col-md-4">
                    <div className="card bg-warning text-white mb-4">
                        <div className="card-body">
                            <h5 className="card-title">🗨️ Total Comments</h5>
                            <p className="card-text">{totalComments}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
