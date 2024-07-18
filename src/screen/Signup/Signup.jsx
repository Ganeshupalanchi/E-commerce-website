import React, { useEffect, useRef, useState } from "react";
import "./Signup.css";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { removeUserFromState, signUpUser } from "../../redux/slices/userSlice";
export default function Signup() {
  const dispatch = useDispatch();
  const { loading, error, user } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const inputFields = useRef({});
  const [allUsers, setAllUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch("http://localhost:8300/users");
        const data = await res.json();
        setAllUsers(data);
      } catch (error) {
        console.error("Failed to fetch users:", error);
      }
    };
    fetchUsers();
  }, []);

  useEffect(() => {
    inputFields.current[0].focus();
  }, []);
  const handleOnchange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const isValidate = () => {
    const { name, email, password } = formData;
    const errorsStore = {};
    if (!name) {
      errorsStore.name = "Name is required.";
      inputFields.current[0].focus();
      toast.warning(errorsStore.name);
      return errorsStore;
    }
    if (!email) {
      errorsStore.email = "Email is required.";
      inputFields.current[1].focus();
      toast.warning(errorsStore.email);
      return errorsStore;
    } else {
      if (!/\S+@\S+\.\S+/.test(email)) {
        errorsStore.email = "Email is not valid.";
        inputFields.current[1].focus();
        toast.warning(errorsStore.email);
        return errorsStore;
      }
    }
    if (!password) {
      errorsStore.password = "Password is required.";
      inputFields.current[2].focus();
      toast.warning(errorsStore.password);
      return errorsStore;
    } else if (password.length < 6) {
      errorsStore.password = "Password must be atleast 6 characters.";
      inputFields.current[2].focus();
      toast.warning(errorsStore.password);
      return errorsStore;
    }
    return errorsStore;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValidateErrors = isValidate();
    const isExitingUser = allUsers.find(
      (user) => user.email === formData.email,
    );
    if (Object.keys(isValidateErrors).length > 0) {
      setErrors(isValidateErrors);
      return;
    } else if (isExitingUser) {
      toast.error("This email is already exist.");
      return;
    }
    dispatch(signUpUser(formData));
  };

  useEffect(() => {
    if (user) {
      toast.success("User Registered Successfully.");
      dispatch(removeUserFromState());
      navigate("/login");
    } else if (error) {
      toast.error(error);
    }
  }, [user, error]);

  return (
    <>
      <div className="register">
        <div className="wrapper">
          <div className="title">
            <span>Register</span>
          </div>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="row">
                <i className="fas fa-user" />
                {/* <i class="fa-solid fa-envelope"></i> */}
                <input
                  type="text"
                  ref={(e) => (inputFields.current[0] = e)}
                  placeholder="Enter Name"
                  name="name"
                  value={formData.name}
                  onChange={handleOnchange}
                  required=""
                />
              </div>
              {/* {errors && (
                <span className="error text-red-300">{errors.name}</span>
              )} */}
            </div>
            <div>
              <div className="row">
                {/* <i className="fas fa-user" /> */}
                <i className="fa-solid fa-envelope"></i>
                <input
                  type="email"
                  ref={(e) => (inputFields.current[1] = e)}
                  placeholder="Email or Phone"
                  name="email"
                  value={formData.email}
                  onChange={handleOnchange}
                />
              </div>
              {/* <span className="error text-red-300">Name is required</span> */}
            </div>
            <div>
              <div className="row">
                <i className="fas fa-lock" />
                <input
                  type="password"
                  ref={(e) => (inputFields.current[2] = e)}
                  placeholder="Enter Password"
                  name="password"
                  value={formData.password}
                  onChange={handleOnchange}
                />
              </div>
              {/* <span className="error text-red-300">Name is required</span> */}
            </div>

            <div className="row button">
              <input
                type="submit"
                value={loading ? "Signing up..." : "Signup"}
              />
            </div>
            {error && <p>{error}</p>}
            {user && <p>Welcome {user.name}</p>}
            <div className="signup-link">
              Already registered? <Link to={"/login"}>Login</Link>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
