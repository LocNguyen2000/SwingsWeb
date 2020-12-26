import React, { useContext, useState } from 'react'
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import "../../css/adminlogin.css"
import { Container, Modal } from 'react-bootstrap';
import { AuthAdminCtx } from '../../context/authAdmin';
import { Redirect } from 'react-router-dom';

import axios from "axios";

const setWithExpiry = (key, obj, ttl) => {
  const now = new Date()
  const item = {
    user: obj,
    expiry: now.getTime() + ttl,
  }
  localStorage.setItem(key, JSON.stringify(item))
}

export const AdminLogin = () => {
  const { authAdmin, setAuthAdmin } = useContext(AuthAdminCtx)
  const [isError, setError ] = useState(false)
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);
  const [registing, setRegisting] = useState(false)

  const initialValues_ = {
    username: "",
    password: "",
  };

  const validationSchema_ = Yup.object().shape({
    username: Yup.string()
      .required("Username is required!"),
    password: Yup.string()
      .required("Password is required!"),
  });

  const onSubmit_ = async (values) => {
    setLogin(true);
    await axios
      .post("http://localhost:5000/admin/login", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        setAuthAdmin(res.data.user);
        setWithExpiry("myAdmin", {username: values.username}, 1000000)
        setRegisting(true)
      })
      .catch((err) => {
        console.log(err)
        setError(true)
        setShow(true)
      })
      .finally(() => {
        setLogin(false)
      });
  };
  // function onClick_Login() {
  //   setAuthAdmin("hello")
  // }

  if (localStorage.getItem('myAdmin') !== null && registing) {
    return <Redirect to="/admin/home" />
  } 
  // else if (localStorage.getItem('myAdmin')){
  //   return <Redirect to="/account" />
  // }

  const onClose = (setFieldValue) => {
    setShow(false); 
    setError(true);

    setFieldValue("username", "");
    setFieldValue("password", "");
  }
  return (
    <Formik
      initialValues={initialValues_}
      validationSchema={validationSchema_}
      onSubmit={onSubmit_}
    >
      {({values,
        errors,
        setFieldValue,
        isValid}) => {
        return (
          <Container className="adminContainer">
            <Modal show={show && isError} onHide={() => {onClose(setFieldValue)}}>
              <Modal.Header closeButton>
                <span>Mật khẩu sai hoặc tài khoản không tồn tại!</span>
              </Modal.Header>
            </Modal>
            <Form>
              <p className="header">Admin</p>
              <label>Username</label>
              <Field className="field" type="text" name="username" value={values.username}/>
              <ErrorMessage className="error" name="username" component="div" />
              <label>Password</label>
              <Field className="field" type="password" name="password" value={values.password}/>
              <ErrorMessage className="error" name="password" component="div" />

              <div className = "button-wrapper">
                <button
                  className="button"
                  type="submit"
                  disabled={login && !isValid}
                >
                  {login ? "Login..." : "Login"}
                </button>
              </div>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
}

