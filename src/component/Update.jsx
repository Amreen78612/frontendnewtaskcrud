import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
const { REACT_APP_API_ENDPOINT } = process.env;

function Update() {
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  });

  const { userId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    fetchUser(userId);
  }, [userId]);

  const fetchUser = async (userId) => {
    try {
      const response = await axios.get(`${REACT_APP_API_ENDPOINT}/users/${userId}`);
      const userData = response.data.users;
      console.log(userData)
      setFormData({
        name: userData.name,
        lastname: userData.lastname,
        email: userData.email,
        phoneNumber: userData.phoneNumber,
      });
    } catch (err) {
      console.log(err.response);
    }
  };

  const updateAPIData = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`${REACT_APP_API_ENDPOINT}/users/${userId}`, formData);
      navigate("/users");
      fetchUser(userId)
      alert("User updated successfully");
    } catch (err) {
      console.log(err);
      alert("Failed to update user");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-8 col-lg-6">
          <div className="card shadow-lg p-4">
            <h5 className="card-title text-center fw-bold fs-3 mb-4">Edit User</h5>
            <form onSubmit={updateAPIData}>
              <div className="mb-3">
                <label className="form-label">First Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="name"
                  defaultValue={formData.name}
                  onChange={handleChange}
                  placeholder="Enter your first name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Last Name</label>
                <input
                  type="text"
                  className="form-control"
                  name="lastname"
                  defaultValue={formData.lastname}
                  onChange={handleChange}
                  placeholder="Enter your last name"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className="form-control"
                  name="phoneNumber"
                  defaultValue={formData.phoneNumber}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                  required
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input
                  type="email"
                  className="form-control"
                  name="email"
                  defaultValue={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                  required
                />
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-submit w-100">
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Update;
