import React, { useEffect, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { del, get } from '../../services/Endpoint.js';
import toast from 'react-hot-toast';

export default function User() {
  const [users, setUsers] = useState([]);  // Fix capitalization
  const [loadedata, setLoadedata] = useState(false);

  // Fetch Users with Correct API Call
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await get("/dashboard/getusers"); // Ensure correct backend route
        console.log("Fetched Users:", response.data); 

        if (response.data && response.data.users) {  // Ensure correct response structure
          setUsers(response.data.users);
        } else {
          setUsers([]);
          toast.error("No users found.");
        }
      } catch (error) {
        console.error("Error fetching users:", error);
        toast.error("Failed to load users.");
      }
    };
    fetchUsers();
  }, [loadedata]); // Reload on deletion

  // Delete User Function
  const handleDelete = async (userId) => {
    if (!userId) {
      toast.error("Invalid user ID.");
      return;
    }

    console.log(" Deleting User ID:", userId); // Debugging  

    const confirmed = window.confirm('Are you sure you want to delete this user?');
    if (confirmed) {
      try {
        const response = await del(`/dashboard/deleteuser/${userId}`); // Ensure correct API route

        if (response.status === 200 && response.data.success) {
          toast.success(response.data.message || "User deleted successfully!");
          setLoadedata(prev => !prev); // Refresh user list after deletion
        } else {
          toast.error(response.data.message || 'Failed to delete the user.');
        }
      } catch (error) {
        console.error('Error deleting user:', error);
        
        if (error.response) {
          if (error.response.status === 404) {
            toast.error("User not found. It may have been deleted already.");
          } else {
            toast.error(error.response.data.message || "An unexpected error occurred.");
          }
        } else {
          toast.error("Network error, please try again.");
        }
      }
    }
  };

  return (
    <div className="container" style={{ paddingTop: "70px" }}>
      <h2 className="text-black text-center fw-bold mb-4">Users Management</h2>
      <div className="table-responsive">
        <table className="table table-striped table-dark">
          <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id}>
                  <th scope="row">{index + 1}</th>
                  <td>{user.FullName}</td> {/* Fixed field name */}
                  <td>{user.email}</td>
                  <td>
                    <button className="btn btn-danger" onClick={() => handleDelete(user._id)}>
                      <FaTrashAlt /> Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center">No users found 😢</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
