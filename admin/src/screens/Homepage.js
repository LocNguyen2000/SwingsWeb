import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import "../css/Homepage.css"
import { Formik, Field, Form, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";

const validationSchema_ = Yup.object().shape({
    username: Yup.string()
      .min(2, "Username's length must be greater than 2!"),
    password: Yup.string()
      .min(6, "Password's length must be greater than 6!"),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), ""], "Confirm password not matched")
  });

export const Homepage = () => {
    const [submit, setSubmit] = useState(false)
    const initialValues_ = {
        username: "",
        password: "",
        confirmPassword: "",
    };
    const onSubmit_ = (values) => {
        setSubmit(true);
        axios
          .put("http://localhost:5000/admin/reset", {
            username: values.username,
            password: values.password
          })
          .then(() => {
            values.username = ""
            values.password = ""
            values.confirmPassword = ""
            setSubmit(false)
          })
          .catch((err) => {
            // setError(true);
            // setSuccess(false);
          })
          .finally(() => {
            // setRegistering(false);
            // setShow(true)
          });
      };
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
                <Form>
                  <p className="header">Reset Account</p>
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
                      disabled={!isValid}
                    >
                      {submit ? "Submit..." : "Submit"}
                    </button>
                  </div>
                </Form>
              </Container>
            );
          }}
        </Formik>
      );
}
