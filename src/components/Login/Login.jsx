import React from "react";
import styles from "./Login.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Helmet } from "react-helmet";

const Login = ({saveUser}) => {

  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  let navigate = useNavigate();

  async function login(values) {
    // console.log("hiiiiii", values);
    setisLoading(true);
    setErrorMessage(null);
    let { data } = await axios
      .post("https://route-ecommerce.onrender.com/api/v1/auth/signin", values)
      .catch((err) => {
        console.log(err);
        setisLoading(false);
        setErrorMessage(err.response.data.message);
      });
    // console.log(data);
    if (data.message == "success") {
      setisLoading(false);
      localStorage.setItem("userToken", data.token)
      saveUser()
      navigate("/");
    }
  }

  let mySchema = Yup.object({
    email: Yup.string().email("Invaled email").required("Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid password")
      .required("Required"),
  });

  // OTHER METHOD FOR VALIDATION

  // function validate(values) {
  //   let errors = {};
  //   if(!values.name) {
  //     errors.name = 'Required'
  //   } else if (values.name.length < 3) {
  //     errors.name = 'Must be more than 3 char'
  //   }
  //   if(!values.email) {
  //     errors.email = 'Required'
  //   } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
  //     errors.email = 'Invalid format'
  //   }
  //   if(!values.password) {
  //     errors.password = 'Required'
  //   } else if (!/^[A-Z][a-z0-9]{3,8}$/i.test(values.password)) {
  //     errors.password = 'Password must start with capital'
  //   }
  //   if(!values.rePassword) {
  //     errors.rePassword = 'Required'
  //   } else if (values.rePassword != values.password) {
  //     errors.rePassword = 'Password and rePassword not matched'
  //   }
  //   if(!values.phone) {
  //     errors.phone = 'Required'
  //   } else if (!/^01[0125][0-9]{8}$/i.test(values.phone)) {
  //     errors.phone = 'Invaled phone'
  //   }
  //   return errors;
  // }

  let formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => login(values),
  });
  return (
    <>
      <Helmet>
        <meta charSet="utf-8" />
        <title>Login</title>
      </Helmet>
      <div className="container my-5">
        <div className="w-75 mx-auto">
          <h3>Login : </h3>
          {errorMessage ? (
            <div className="alert alert-danger"> {errorMessage} </div>
          ) : (
            ""
          )}
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control mb-2"
              name="email"
              id="email"
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.email && formik.touched.email ? (
              <div className="alert alert-danger"> {formik.errors.email} </div>
            ) : (
              ""
            )}

            <label htmlFor="password">Password</label>
            <input
              type="password"
              className="form-control mb-2"
              name="password"
              id="password"
              value={formik.values.password}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.password && formik.touched.password ? (
              <div className="alert alert-danger">
                {" "}
                {formik.errors.password}{" "}
              </div>
            ) : (
              ""
            )}

            {isLoading ? (
              <button className="btn bg-main">
                <i className="fa fa-spin fa-spinner"></i>
              </button>
            ) : (
              <button className="btn bg-main">Login</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
