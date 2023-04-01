import React from "react";
import styles from "./Register.module.css";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [isLoading, setisLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  let navigate = useNavigate()

  async function register(values) {
    // console.log("hiiiiii", values);
    setisLoading(true);
    setErrorMessage(null)
    let { data } = await axios.post(
      "https://route-ecommerce.onrender.com/api/v1/auth/signup",
      values
    ).catch((err) => {
      console.log(err);
      setisLoading(false);
      setErrorMessage(err.response.data.errors.msg)
    })
    console.log(data);
    if (data.message == "success") {
      setisLoading(false);
      navigate("/login")
    }
  }

  let mySchema = Yup.object({
    name: Yup.string()
      .required("name is Required")
      .min(3, "min char is 3")
      .max(15, "max chars is 15"),
    email: Yup.string().email("Invaled email").required("Required"),
    password: Yup.string()
      .matches(/^[A-Z][a-z0-9]{3,8}$/, "Invalid password")
      .required("Required"),
    rePassword: Yup.string()
      .required("Required")
      .oneOf([Yup.ref("password")], "rePassword must be match"),
    phone: Yup.string()
      .required("Phone Required")
      .matches(/^01[0125][0-9]{8}$/, "invalied Phone"),
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
      name: "",
      email: "",
      password: "",
      rePassword: "",
      phone: "",
    },
    validationSchema: mySchema,
    onSubmit: (values) => register(values),
  });
  return (
    <>
      <div className="container my-5">
        <div className="w-75 mx-auto">
          <h3>Register : </h3>
          {errorMessage ? <div className="alert alert-danger"> {errorMessage} </div> : ''}
          <form onSubmit={formik.handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              className="form-control mb-2"
              id="name"
              name="name"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />

            {formik.errors.name && formik.touched.name ? (
              <div className="alert alert-danger"> {formik.errors.name} </div>
            ) : (
              ""
            )}

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

            <label htmlFor="rePassword">rePassword</label>
            <input
              type="password"
              className="form-control mb-2"
              name="rePassword"
              id="rePassword"
              value={formik.values.rePassword}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.rePassword && formik.touched.rePassword ? (
              <div className="alert alert-danger">
                {" "}
                {formik.errors.rePassword}{" "}
              </div>
            ) : (
              ""
            )}

            <label htmlFor="phone">Phone</label>
            <input
              type="tel"
              className="form-control mb-2"
              name="phone"
              id="phone"
              value={formik.values.phone}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
            />
            {formik.errors.phone && formik.touched.phone ? (
              <div className="alert alert-danger"> {formik.errors.phone} </div>
            ) : (
              ""
            )}

            {isLoading ? (
              <button className="btn btn-success">
                <i className="fa fa-spin fa-spinner"></i>
              </button>
            ) : (
              <button className="btn btn-success">Register</button>
            )}
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
