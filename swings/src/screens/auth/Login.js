import React, {useContext, useState} from 'react'
import { Container, Modal } from 'react-bootstrap'
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import axios from "axios";
import "../../css/login.css"
import { AuthUserCtx } from '../../context/authUser';
import { Redirect } from 'react-router-dom';

export const Login = () => {
  const { authUser, setAuthUser } = useContext(AuthUserCtx);
  const [isError, setError ] = useState(false)
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);

  // useEffect(() => {
  //   console.log("prepare login: " + authUser)
  // }, [authUser])

  const [registing, setRegisting] = useState(false)
  
  const initialValues_ = {
    username: "",
    password: ""
  };

  const setWithExpiry = (key, obj, ttl) => {
    const now = new Date()
    const item = {
      user: obj,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  const validationSchema_ = Yup.object().shape({
    username: Yup.string()
      .min(6, "Username's length must be greater than 6!")
      .required("Username is required!"),
    password: Yup.string()
      .min(6, "Password's length must be greater than 6!")
      .required("Password is required!"),
  });
  const onSubmit_ = (values) => {
    setLogin(true);
    axios
      .post("http://localhost:5000/login", {
        username: values.username,
        password: values.password,
      })
      .then((res) => {
        setAuthUser(res.data.user);
        
        setWithExpiry("myUser", {username: res.data.message.user.username, userId: res.data.message.user.userId}, 1000000)
        setRegisting(true)
      })
      .catch((err) => {
        setError(true)
        setShow(true)
      })
      .finally(() => {
        setLogin(false)
      });
  };
  // function onClick_Login() {
  //   console.log("Clicked to Login!");
  //   setAuthUser("hello")
  //   console.log("Click login" + authUser)
  // }

  if (localStorage.getItem('myUser') !== null && registing) {
    return <Redirect to="/" />
  } else if (localStorage.getItem('myUser')){
    return <Redirect to="/account" />
  }

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
          <Container className="login">
            <Modal show={show && isError} onHide={() => {onClose(setFieldValue)}}>
              <Modal.Header closeButton>
                <span>Mật khẩu sai hoặc tài khoản không tồn tại!</span>
              </Modal.Header>
            </Modal>
            <Form>
              <p className="header">Log in</p>
              <label>Username</label>
              <Field className="field" type="text" name="username" value={values.username}/>
              <ErrorMessage className="error" name="username" component="div" />
              <label>Password</label>
              <Field className="field" type="password" name="password" value={values.password}/>
              <ErrorMessage className="error" name="password" component="div" />

              <div className="button-wrapper">
                <button
                  className="button"
                  type="submit"
                  disabled={login && !isValid}
                >
                  {login ? "Login..." : "Login"}
                  </button>
              </div>

              <a href="/register" >
                Not have an account yet? Register
                </a>
            </Form>
          </Container>
        );
      }}
    </Formik>
  );
}
