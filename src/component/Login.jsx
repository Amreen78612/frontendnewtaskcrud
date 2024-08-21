import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ValidationLogin from "../validation/loginvalidation";

function Login({ onLogin }) {
  const navigate = useNavigate();
  const [users, setUsers] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [error, setError] = useState(null);
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setUsers({
      ...users,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = ValidationLogin(users);
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      try {
        const response = await onLogin(users.email, users.password);
        console.log("Login successful:", response); // Debug response
        navigate("/users");
      } catch (error) {
        console.error("Login error in component:", error); // Debug error
        setError(error.response?.data?.message || "Login failed. Please try again.");
      }
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div className="container my-5">
      <div className="row ">
      <div className="col-xxl-4 col-xl-4 col-lg-3 col-md-2 col-sm-12 col-xs-12">
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-6 col-md-8 col-sm-12 col-xs-12">
          <div className="card shadow-lg rounded p-4" style={{marginTop: "148px"}}>
            <h4 className="title">Login to Your Account 👋</h4>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Your Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter Your Email"
                  className="form-control"
                  name="email"
                  value={users.email}
                  onChange={handleChange}
                />
                {errors.email && <div className="text-danger">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <div className="input-group">
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter Your Password"
                    className="form-control"
                    name="password"
                    value={users.password}
                    onChange={handleChange}
                  />
                  <button
                    type="button"
                    className="btn btn-outline-secondary"
                    onClick={togglePasswordVisibility}
                  >
                    <i className={`far ${showPassword ? 'fa-eye' : 'fa-eye-slash'}`}></i>
                  </button>
                </div>
                {errors.password && <div className="text-danger">{errors.password}</div>}
              </div>

              {error && <div className="alert alert-danger">{error}</div>}

              <p>
                Don't have an account? <a href="/">Register</a>
              </p>

              <button type="submit" className="btn btn-submit w-100 mt-3">
                Login
              </button>
            </form>
          </div>
        </div>
        <div className="col-xxl-4 col-xl-4 col-lg-3 col-md-2 col-sm-12 col-xs-12">
        </div>
      </div>
    </div>
  );
}

export default Login;

