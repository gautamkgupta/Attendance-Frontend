import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import styled from "styled-components";

const ApplyRegularization = () => {
  const history = useNavigate();
  const { userId, email, date } = useParams();
  const [Reason, setReason] = useState("");

  const [formData, setFormData] = useState({
    userName: `${localStorage.getItem("first_name")} ${localStorage.getItem(
      "last_name"
    )}`,
    email: email,
    att_date: date,
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log(formData);

    // Call Regularization API
    try {
      const response = await fetch(
        "http://localhost:9001/api/regularization/postData",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email: localStorage.getItem("email"),
            date: date,
            reason: Reason,
            status: "Pending",
            comment: "NA",
          }),
        }
      );
      const data = await response.json();
      console.log("Check-out successful:", data);
    } catch (error) {
      console.error("Error during check-out:", error);
    }

    history("/regularization");
  };

  return (
    <div className="container">
      <div className="form_layout">
        <div className="pb-2">
          <h2 className="edit_att_header">Apply for Regularization</h2>
        </div>
        <div>
          <form className="row g-3" onSubmit={handleSubmit}>
            <div className="col-md-6">
              <label htmlFor="userName" className="form-label">
                User Name
              </label>
              <input
                type="text"
                className="form-control"
                id="userName"
                name="userName"
                value={formData.userName}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="email" className="form-label">
                E-mail
              </label>
              <input
                type="text"
                className="form-control"
                id="email"
                name="email"
                value={formData.email}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="att_date" className="form-label">
                Regularization Date
              </label>
              <input
                type="date"
                className="form-control"
                id="att_date"
                name="att_date"
                value={formData.att_date}
                readOnly
              />
            </div>
            <div className="col-md-6">
              <label htmlFor="reason" className="form-label">
                Reason
              </label>
              <input
                type="text"
                className="form-control"
                id="reason"
                name="reason"
                placeholder="Enter reason for regularization"
                onChange={(e) => {
                  setReason(e.target.value);
                }}
              />
            </div>
            <div className="col-12">
              <button type="submit" className="btn btn-primary">
                Apply
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ApplyRegularization;
