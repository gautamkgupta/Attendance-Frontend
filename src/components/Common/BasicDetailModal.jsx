import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { message } from "antd";
import { Formik, Form, Field, ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserById } from "../../features/web/web-actions";

const StyledContainer = styled.div`
  .time-slot-card {
    border: 1px solid;
    padding: 10px 18px;
    border-radius: 5px;
    margin-left: 30px;
    cursor: pointer;
  }
`;

function UserBasicDetails(props) {
  const [show, setShow] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const formData = {
    first_name: "",
    last_name: "",
    email: "",
  };
  const dispatch = useDispatch();
  const userInfo =
  localStorage.getItem("userInfo") !== "undefined"
    ? localStorage.getItem("userInfo")
    : null;
let user_id = null;
if (userInfo) {
  const userData = JSON.parse(userInfo);
  user_id = userData.id;
}
  const [fd, setFd] = useState(formData);
  const getUser = useSelector((state) => state.userById.data || []);
  useEffect(() => {
    dispatch(fetchUserById(user_id));
  }, [dispatch, user_id]);
  useEffect(() => {
    if (getUser && getUser.data) {
      setFd(getUser.data);
    }
  }, [getUser]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (formData, { setSubmitting }) => {
    props.onSubmit(formData, user_id)
      .then((resp) => {
        if (!resp.success) {
          if (resp.responseCode === 422) {
            const newErrors = {};
            Object.entries(resp.data).forEach(([key, value]) => {
              newErrors[key] = value[0];
            });
          }
          message.error(resp.message)
          window.scrollTo(0, 0);
        } else {
          message.success("Profile updated successfully");
          setIsSubmitted(true);
          setShow(false);
          setSubmitting(false);
        }
      });
  };

  const buttonText = getUser.length === 0 ? "Add Basic Details" : "Edit Basic Details";
  return (
    <>
      <button type="button" className="custom_btn" onClick={handleShow}>
        {buttonText}
      </button>

      <Modal centered scrollable show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>
            {getUser.length === 0 ? "Add Basic Details" : "Edit Basic Details"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik 
          initialValues={fd}
          enableReinitialize={true} 
           onSubmit={handleSubmit}>
            {({ isSubmitting, handleSubmit }) => (
              <Form
                onSubmit={(event) => {
                  event.preventDefault();
                  handleSubmit(event);
                }}
              >
                <h6>First Name</h6>
                <Field className="form-control" type="text" required name="first_name" />
                <ErrorMessage name="first_name" component="div" />

                <h6>Last Name</h6>
                <Field className="form-control" type="text" required name="last_name" />
                <ErrorMessage name="last_name" component="div" />

                <h6>Email</h6>
                <Field className="form-control" type="email" required name="email" />
                <ErrorMessage name="email" component="div" />

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="custom_btn mt-4"
                >
                  Continue
                </button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default UserBasicDetails;
