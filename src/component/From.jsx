import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import ValidationLogin from "../validation/usersvalidations";

const { REACT_APP_API_ENDPOINT } = process.env;

function From() {
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    password: "",
    phoneNumber: "",
    image: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();

    const validationErrors = ValidationLogin(formData);
    setErrors(validationErrors);
    
    if (Object.keys(validationErrors).length === 0) {
      try {
        await axios.post(`${REACT_APP_API_ENDPOINT}/users`, formData);
        alert("User Created Successfully");
        navigate("/users");
      } catch (error) {
        setError(error.response?.data?.message || "Failed to create user");
      }
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="header p-4">
      <div className="row">
      <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12 p-2">
        </div>
        <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12 p-2">
          <form className="form" onSubmit={submit}>
            <div className="card shadow rounded p-4">
              <h5 className="card-title text-center fw-bold fs-3 mb-4">
                Enter Your Details
              </h5>
              <div className="card-body">
                <div className="row">
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="inputName" className="form-label">
                      First Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="inputName"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      placeholder="Enter your first name here.."
                    />
                    {errors.name && (
                      <div className="text-danger">{errors.name}</div>
                    )}
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="inputLastName" className="form-label">
                      Last Name
                    </label>
                    <input
                      className="form-control"
                      type="text"
                      id="inputLastName"
                      name="lastname"
                      value={formData.lastname}
                      onChange={handleChange}
                      placeholder="Enter your last name here.."
                    />
                    {errors.lastname && (
                      <div className="text-danger">{errors.lastname}</div>
                    )}
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="inputPassword" className="form-label">
                      Password
                    </label>
                    <div className="input-group">
                      <input
                        className="form-control"
                        type={showPassword ? "text" : "password"}
                        id="inputPassword"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password here.."
                      />
                      <button
                        type="button"
                        className="btn btn-outline-secondary"
                        onClick={togglePasswordVisibility}
                      >
                        <i
                          className={`far ${
                            showPassword ? "fa-eye" : "fa-eye-slash"
                          }`}
                        ></i>
                      </button>
                    </div>
                    {errors.password && (
                      <div className="text-danger">{errors.password}</div>
                    )}
                  </div>
                  <div className="col-xxl-6 col-xl-6 col-lg-6 col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="inputPhone" className="form-label">
                      Phone
                    </label>
                    <input
                      className="form-control"
                      type="tel"
                      id="inputPhone"
                      name="phoneNumber"
                      value={formData.phoneNumber}
                      onChange={handleChange}
                      placeholder="Enter your phone number here.."
                    />
                    {errors.phoneNumber && (
                      <div className="text-danger">{errors.phoneNumber}</div>
                    )}
                  </div>
                  <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
                    <label htmlFor="inputEmail" className="form-label">
                      Email
                    </label>
                    <input
                      className="form-control"
                      type="email"
                      id="inputEmail"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Enter your email here.."
                    />
                    {errors.email && (
                      <div className="text-danger">{errors.email}</div>
                    )}
                  </div>
                  {error && <div className="alert alert-danger">{error}</div>}
                </div>
               <div className="col-xxl-12 col-xl-12 col-lg-12 col-md-12 col-sm-12 col-xs-12">
               <button type="submit" className="btn btn-submit w-100 mt-4">
                  Submit
                </button>
               </div>
              </div>
            </div>
          </form>
        </div>
        <div className="col-xxl-3 col-xl-3 col-lg-3 col-md-12 col-sm-12 col-xs-12 p-2">
        </div>
      </div>
    </div>
  );
}

export default From;
