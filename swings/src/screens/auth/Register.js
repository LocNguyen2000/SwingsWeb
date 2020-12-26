import React, { useState } from 'react'
import { Container, Modal } from 'react-bootstrap'
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import "../../css/register.css"
import axios from "axios"
import { Redirect } from 'react-router-dom';

const validationSchema_ = Yup.object().shape({
  username: Yup.string()
    .min(6, "Username's length must be greater than 6!")
    .required("Username is required!"),
  fullname: Yup.string()
    .required("Fullname is required!"),
  password: Yup.string()
    .min(6, "Password's length must be greater than 6!")
    .required("Password is required!"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), ""], "Confirm password not matched")
    .required("Confirm password is required!"),
});

export const Register = () => {
  const [registering, setRegistering] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [isError, setError] = useState(false);
  const [show, setShow] = useState(false);
  const [navigator, setNavigator] = useState(false)

  const initialValues_ = {
    username: "",
    fullname: "",
    password: "",
    confirmPassword: "",
  };

  const onSubmit_ = (values) => {
    setRegistering(true);
    axios
      .post("http://localhost:5000/register", {
        username: values.username,
        name: values.fullname,
        password: values.password,
        email: "",
        address: "",
        phone: ""
      })
      .then(() => {
        setSuccess(true);
        setError(false);
      })
      .catch((err) => {
        setError(true);
        setSuccess(false);
      })
      .finally(() => {
        setRegistering(false);
        setShow(true)
      });
  };

  const onClose = (setFieldValue) => {
    setShow(false);
    setFieldValue("username", "");
    setFieldValue("fullname", "");
    setFieldValue("password", "");
    setFieldValue("confirmPassword", "");
    setNavigator(true)
  }

  if (navigator) {
    return <Redirect to="/login" />
  }

  return (
    <Formik
      initialValues={initialValues_}
      validationSchema={validationSchema_}
      onSubmit={onSubmit_}
    >
      {({
        values,
        errors,
        setFieldValue,
        isValid
      }) => {
        return (
          <Container className="register">
            <Modal show={show && isSuccess && !isError} onHide={() => { onClose(setFieldValue) }}>
              <Modal.Header closeButton>
                <span>Đăng kí thành công</span>
              </Modal.Header>
            </Modal>
            <Modal show={show && isError && !isSuccess} onHide={() => { setShow(false) }}>
              <Modal.Header closeButton>
                <span>Tài khoản không hợp lệ</span>
              </Modal.Header>
            </Modal>
            <Form>
              <p className="header">Register</p>
              <label>Full name</label>
              <Field className="field" type="text" name="fullname" value={values.fullname} />
              <ErrorMessage className="error" name="fullname" component="div" />
              <label>Username</label>
              <Field className="field" type="text" name="username" value={values.username} />
              <ErrorMessage className="error" name="username" component="div" />
              <label>Password</label>
              <Field className="field" type="password" name="password" value={values.password} />
              <ErrorMessage className="error" name="password" component="div" />
              <label>Confirm Password</label>
              <Field className="field" type="password" name="confirmPassword" value={values.confirmPassword} />
              <ErrorMessage
                className="error"
                name="confirmPassword"
                component="div"
              />

              <div className="button-wrapper">
                <button
                  className="button"
                  type="submit"
                  disabled={registering && !isValid}
                >
                  {registering ? "Registering ..." : "Register"}
                </button>
              </div>

              <a href="/login">
                Already have an account? Login
              </a>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
}