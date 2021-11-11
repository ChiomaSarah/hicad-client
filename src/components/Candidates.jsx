import React, { useState, useEffect } from "react";
import useToken from "../useToken";
import MuiAlert from "@material-ui/lab/Alert";
import CandidatesCard from "./CandidatesCard";
import Loader from "../ui/Loader";
import { toast } from "react-toastify";
import { Link } from "react-router-dom";

function Alert(props) {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
}

function Candidates(props) {
  const { token } = useToken();
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(false);
  let [error, setError] = useState("");

  useEffect(() => {
    async function getCandidates() {
      try {
        setLoading(true);
        const response = await fetch("https://hicad-coding-test.herokuapp.com/job/candidates", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        const result = await response.json();
        setLoading(false);
        if (response.ok) {
          // console.log(result);
          setCandidates(result.data);
          toast.success("Candidates retrieved successfully!");
        }

        if (!response.ok) {
          setError(result.error);
        }
      } catch (err) {
        setError(err.message);
      }
    }

    getCandidates();
  }, [token]);

  if (loading) {
    return <Loader />;
  }

  return (
    <div>
      <div className="container mr-0">
        <div className="col-lg-12 text-right">
          <Link to="/admin/logout" className="nav-link">
            <button
              type="button"
              className="btn btn-outline-light btn-md btn-dark mt-5"
            >
              Logout
            </button>
          </Link>
        </div>
      </div>
      <div className="container mt-5 mb-5">
        <h3 className="text-center">Candidates</h3>

        {error && (
          <Alert severity="error" onClick={() => setError(null)}>
            {props.error || error}
          </Alert>
        )}

        <div>
          <div className="wrapper">
            {candidates.map((candidate) => (
              <CandidatesCard
                key={candidate.user_id}
                candidate={candidate}
              ></CandidatesCard>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
export default Candidates;
