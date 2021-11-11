import React from "react";
import { useHistory } from "react-router";
import { toast } from "react-toastify";

const Logout = () => {
  const history = useHistory();

  const check = window.confirm("You are about to logout.");
  if (check) {
    sessionStorage.removeItem("token");
  }

  toast.success("You have been logged out!");
  history.push("/");
  window.location.reload();

  return (
    <div className="text-center mt-5">
      <h2>Login to access this page.</h2>
    </div>
  );
};

export default Logout;
