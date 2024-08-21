import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useParams, useNavigate } from "react-router-dom";
import { FaEdit, FaTrashAlt } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";

const { REACT_APP_API_ENDPOINT } = process.env;

function Main() {
  const [users, setUsersData] = useState([]);
  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchUserById(userId);
    }
  }, [userId]);

  const fetchUserById = async () => {
    try {
      const response = await axios.get(
        `${REACT_APP_API_ENDPOINT}/users/${userId}`
      );
      const userData = response.data.users;
      setFormData({
        name: userData.name,
        lastname: userData.lastname,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      });
      alert("Data fetched successfully");
    } catch (err) {
      console.log(err.response);
    }
  };

  const fetchUsers = async () => {
    try {
      const response = await axios.get(`${REACT_APP_API_ENDPOINT}/users`);
      setUsersData(response.data.users);
      navigate("/users");
    } catch (err) {
      console.error(err.response || err.message);
    }
  };

  const handleDelete = async (userId) => {
    try {
      await axios.delete(`${REACT_APP_API_ENDPOINT}/users/${userId}`);
      fetchUsers();
      alert("Data successfully deleted");
    } catch (error) {
      console.error("Error deleting data:", error);
      alert("An error occurred while deleting data");
    }
  };

  return (
    <div className="container my-5">
      <div className="card shadow rounded">
        <div className="card-body">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h5 className="card-title fs-2 text-secondary mb-0">CRUD API</h5>
            <Link to="/" className="btn btn-submit btn-sm" style={{width: "21%", height: "40px"}}>
              Add User
            </Link>
          </div>
          <div className="table-responsive">
            <table className="table table-striped table-bordered">
              <thead className="table-dark text-white">
                <tr>
                  <th scope="col">S.No</th>
                  <th scope="col">First Name</th>
                  <th scope="col">Phone</th>
                  <th scope="col">Email</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user, index) => (
                  <tr key={user._id}>
                    <td>{index + 1}</td>
                    <td>
                      {user.name} {user.lastname}
                    </td>
                    <td>{user.phoneNumber}</td>
                    <td>{user.email}</td>
                    <td>
                      <div className="d-inline-flex">
                        <Link to={`/users/${user._id}`} className="me-2">
                          <button
                            className="btn btn-sm rounded-circle edit_sales p-2"
                            style={{ width: "36px", height: "36px" }}
                          >
                            <FaEdit className="icon" />
                          </button>
                        </Link>
                        <button
                          className="btn btn-sm rounded-circle delete-record p-2"
                          style={{ width: "36px", height: "36px" }}
                          onClick={() => handleDelete(user._id)}
                        >
                          <FaTrashAlt className="icon" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Main;
