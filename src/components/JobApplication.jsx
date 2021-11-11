import React, { useState } from "react";
import { Typography } from "@material-ui/core";
import { toast } from "react-toastify";
import MuiAlert from "@material-ui/lab/Alert";
import { useHistory } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

const JobApplication = (props) => {
  const history = useHistory();

  const [data, setData] = useState({
    firstname: "",
    surname: "",
    phone_number: "",
    email_address: "",
    state_of_origin: "",
    local_government: "",
    image: "",
  });

  let [error, setError] = useState("");

  const handleChange = (name) => (e) => {
    const value = name === "image" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };

  async function handleSubmit(e) {
    try {
      e.preventDefault();

      const formData = new FormData();
      formData.append("firstname", data.firstname);
      formData.append("surname", data.surname);
      formData.append("phone_number", data.phone_number);
      formData.append("email_address", data.email_address);
      formData.append("state_of_origin", data.state_of_origin);
      formData.append("local_government", data.local_government);
      formData.append("image", data.image);

      const response = await fetch("https://hicad-coding-test.herokuapp.com/job/application", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      console.log(result);
      setData(result);

      if (!response.ok) {
        setError(result.error);
        window.location.reload();
      }

      if (response.ok) {
        toast.success("Application Sent.");

        history.push("/");
      }
    } catch (err) {
      setError(err.message);
    }
  }

  if (setError.message) {
    error = <div>{setError.message}</div>;
  }

  return (
    <>
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
                      <h2 className="fw-bold mb-2 text-uppercase">
                        APPLICATION FORM
                      </h2>
                      <Typography className="text-white-50 mb-5">
                        Fill all required fields!
                      </Typography>

                      <div className="form-row">
                        <div className="form-group col-6 col-md-6 ">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="fistname"
                            placeholder="Firstname"
                            value={data.firstname}
                            onChange={handleChange("firstname")}
                          />
                        </div>
                        <div className="form-group col-6 col-md-6">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="surname"
                            placeholder="Surname"
                            value={data.surname}
                            onChange={handleChange("surname")}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <input
                          type="text"
                          className="form-control form-control-lg"
                          name="phone_number"
                          placeholder="Phone Number"
                          value={data.phone_number}
                          onChange={handleChange("phone_number")}
                        />
                      </div>

                      <div className="form-group">
                        <input
                          type="email"
                          className="form-control form-control-lg"
                          name="email_address"
                          placeholder="Email Address"
                          value={data.email_address}
                          onChange={handleChange("email_address")}
                        />
                      </div>

                      <div className="form-row">
                        <div className="form-group col-6 col-md-6 ">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="state_of_origin"
                            placeholder="State of Origin"
                            value={data.state_of_origin}
                            onChange={handleChange("state_of_origin")}
                          />
                        </div>
                        <div className="form-group col-6 col-md-6">
                          <input
                            type="text"
                            className="form-control form-control-lg"
                            name="local_government"
                            placeholder="Local Government"
                            value={data.local_government}
                            onChange={handleChange("local_government")}
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <input
                          type="file"
                          className="form-control form-control-lg"
                          accept=".jpg, .jpeg"
                          name="image"
                          onChange={handleChange("image")}
                          required
                        />
                      </div>

                      <button
                        className="btn btn-outline-light btn-lg px-5 mt-5"
                        type="submit"
                      >
                        Submit Application
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default JobApplication;
