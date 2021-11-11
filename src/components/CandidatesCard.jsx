import React from "react";
import "./Candidates.css";

const CandidatesCard = ({ candidate }) => {
  return (
    <div className="wrapper mt-5" key={candidate.user_id}>
      <div>
        <div className="card hovercard">
          <div className="cardheader"></div>
          <div className="avatar">
            <img src={candidate.passport_photograph} alt="user's avatar" />
          </div>
          <div className="info">
            <div className="title" style={{ textTransform: "capitalize" }}>
              {candidate.username}
            </div>
            <div className="desc">Candidate ID: {candidate.user_id}</div>
            <div className="desc">Firstname: {candidate.firstname}</div>
            <div className="desc">Surname: {candidate.surname}</div>
            <div className="desc">Phone Number: {candidate.phone_number}</div>
            <div className="desc">Email Address: {candidate.email_address}</div>
            <div className="desc">
              State of Origin: {candidate.state_of_origin}
            </div>
            <div className="desc">
              Local Government: {candidate.local_government}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CandidatesCard;
