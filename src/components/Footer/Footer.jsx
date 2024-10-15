import React, { useState } from "react";
import styled from "styled-components";
// import { createEnquiry } from "../../features/web/web-actions";
import { message } from "antd";

const StyledContainer = styled.div`
  background: #f6fafa;
  padding: 10px 0px 10px 0px;
  margin-top: 2em;

  p {
    font-weight: 600 !important;
    color: #000 !important;
  }
`;

function Footer() {
  const [isSubmitted, setIsSubmitted] = useState(false);

  // const handleSubmit = async (values, { setSubmitting, resetForm }) => {
  //   try {
  //     console.log("Form data:", values);
  //     const response = await createEnquiry({ ...values });
  //     if (response.success) {
  //       message.success("Our Experts Will Get In Touch With You!");
  //       resetForm();
  //       setIsSubmitted(true);
  //     } else {
  //       message.error("Error in submitting your Enquiry");
  //     }
  //   } catch (error) {
  //     console.error("Error occurred:", error);
  //   } finally {
  //     setSubmitting(false);
  //   }
  // };

  return (
    <StyledContainer>
      <div className="container">
        <p className="pt-2 text-center">
          {" "}
          Copyright &#169; TYS Attendance Crafted By GKG
        </p>
      </div>
    </StyledContainer>
  );
}

export default Footer;
