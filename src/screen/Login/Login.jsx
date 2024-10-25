import React, { useEffect, useState } from "react";
import "./Login.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
export default function Login() {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [allUsers, setAllUsers] = useState();
  console.log(allUsers);

  const navigate = useNavigate();
  useEffect(() => {
    const fetchUsers = () =>
      fetch(`http://localhost:8300/users`)
        .then((res) => res.json())
        .then((data) => setAllUsers(data))
        .catch((err) => console.log(err));
    fetchUsers();
  }, []);

  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const loggedInUser = allUsers.find(
      (user) =>
        user.email === formData.email && user.password === formData.password,
    );
    console.log(allUsers);

    if (loggedInUser) {
      // console.log(loggedInUser);
      toast.success("Login Successfully ...");
      sessionStorage.setItem("loggedInUser", JSON.stringify(loggedInUser));
      navigate("/");
      return;
    } else {
      toast.error("Invalid Credentials");
      return;
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return (
    <>
      <div className="login">
        <div className="wrapper">
          <div className="title">
            <span>Login</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="row">
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  placeholder="Enter Email"
                  name="email"
                  value={formData.email}
                  onChange={handleOnchange}
                  required
                />
              </div>
              {/* <span className="error text-red-300">Name is required</span> */}
            </div>
            <div>
              <div className="row">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formData.password}
                  onChange={handleOnchange}
                  required
                />
              </div>
            </div>
            {/* <div className="pass">
              <a href="">Forgot password?</a>
            </div> */}
            <div className="row button">
              <input type="submit" defaultValue="Login" />
            </div>

            <div className="signup-link">
              Not a member? <Link to={"/register"}>Signup now</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
