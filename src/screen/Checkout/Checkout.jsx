import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function Checkout() {
  const navigate = useNavigate();
  const toastShownRef = useRef(false);
  const loggedInUser = sessionStorage.getItem("loggedInUser")
    ? JSON.parse(sessionStorage.getItem("loggedInUser"))
    : "";
  useEffect(() => {
    if (!loggedInUser && !toastShownRef.current) {
      toast.warning("Login to Checkout.");
      toastShownRef.current = true;
      navigate("/login");
    }
  }, [loggedInUser, navigate]);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  return <div>Checkout</div>;
}
