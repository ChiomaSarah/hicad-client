import Alert from "@material-ui/lab/Alert";
import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";

const AdminLogin = ({ setToken }, props) => {
  let history = useHistory();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let [error, setError] = useState("");

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const body = {
        email,
        password,
      };

      const response = await fetch("https://hicad-coding-test.herokuapp.com/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },

        body: JSON.stringify(body),
      });

      const result = await response.json();
      console.log(result);
      setToken(result);

      if (!response.ok) {
        setError(result.error);
      }

      if (response.ok) {
        history.push("/candidates");
        window.location.reload();
      }
    } catch (err) {
      setError(err.message);
    }
  }

  return (
    <section className="vh-100 gradient-custom">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-12 col-md-8 col-lg-6 col-xl-5">
            <div
              className="card bg-dark text-white"
              style={{ borderRadius: "1rem" }}
            >
              <div className="card-body p-5 text-center">
                <form onSubmit={handleSubmit}>
                  {error && (
                    <Alert severity="error" onClick={() => setError(null)}>
                      {props.error || error}
                    </Alert>
                  )}

                  <div className="mb-md-5 mt-md-4 pb-5">
                    <h2 className="fw-bold mb-2 text-uppercase">Login</h2>
                    <Typography className="text-white-50 mb-5">
                      Please enter your email and password!
                    </Typography>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="email"
                        id="typeEmailX"
                        className="form-control form-control-lg"
                        name="email"
                        onChange={(e) => setEmail(e.target.value)}
                      />
                      <label className="form-label" htmlFor="typeEmailX">
                        Email
                      </label>
                    </div>

                    <div className="form-outline form-white mb-4">
                      <input
                        type="password"
                        id="typePasswordX"
                        className="form-control form-control-lg"
                        name="password"
                        onChange={(e) => setPassword(e.target.value)}
                      />
                      <label className="form-label" htmlFor="typePasswordX">
                        Password
                      </label>
                    </div>

                    <button
                      className="btn btn-outline-light btn-lg px-5"
                      type="submit"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AdminLogin;
