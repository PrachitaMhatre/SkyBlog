import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { del, get } from '../../services/Endpoint.js';
import toast from 'react-hot-toast';

export default function User() {
  const [users, setUsers] = useState([]);
  const [loadedata, setLoadedata] = useState(false);

  // ✅ Fetch Users
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get("/dashboard/getusers");
        console.log("📡 Fetched Users:", response.data); 

        if (response.data && response.data.users) {  
          setUsers(response.data.users);
        } else {
          setUsers([]);
          toast.error("No users found.");
        }
      } catch (error) {
        console.error("❌ Error fetching users:", error);
        toast.error("Failed to load users.");
      }
    };
    fetchUsers();
  }, [loadedata]);

  // ✅ Delete User
  const handleDelete = async (userId) => {
    if (!userId) {
      toast.error("Invalid user ID.");
      return;
    }

    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      try {
        const response = await del(`/dashboard/deleteuser/${userId}`);

        if (response.status === 200 && response.data.success) {
          toast.success(response.data.message || "User deleted successfully!");
          setLoadedata(prev => !prev); 
        } else {
          toast.error(response.data.message || 'Failed to delete the user.');
        }
      } catch (error) {
        console.error('❌ Error deleting user:', error);
        toast.error(error.response?.data?.message || "An unexpected error occurred.");
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: "70px" }}>
      <h2 className="text-dark text-center fw-bold mb-4">User Management</h2>
      <div className="table-responsive">
        <table className="table table-hover table-striped custom-table">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <td>{index + 1}</td>
                  <td>{user.FullName}</td>
                  <td>{user.email}</td>
                  <td>
                    <button className="btn btn-danger delete-btn" onClick={() => handleDelete(user._id)}>
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center text-muted">No users found 😢</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Custom CSS for Improved Design */}
      <style>
        {`
          /* Custom Table Design */
          .custom-table {
            border-radius: 8px;
            overflow: hidden;
            background: white;
            box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
          }

          .custom-table th, .custom-table td {
            padding: 12px;
            text-align: center;
          }

          .custom-table th {
            background-color: #343a40;
            color: white;
          }

          /* Delete Button Styling */
          .delete-btn {
            transition: all 0.3s ease-in-out;
          }

          .delete-btn:hover {
            background-color: #d32f2f;
            transform: scale(1.05);
          }

          /* Responsive Design */
          @media (max-width: 768px) {
            .custom-table {
              font-size: 14px;
            }

            .delete-btn {
              font-size: 12px;
              padding: 5px 8px;
            }
          }
        `}
      </style>
    </div>
  );
}
