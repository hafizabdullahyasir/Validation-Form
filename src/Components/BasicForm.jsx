import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";

const BasicForm = () => {
  const defaultValue = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log("Submitted values:", values);
  };

  const validationSchema = yup.object().shape({
    name: yup.string().required("Please enter your name"),
    email: yup
      .string()
      .required("Please enter your email")
      .email("Please enter a valid email"),
    password: yup
      .string()
      .required("Please enter your password")
      .min(8, "Password must be at least 8 characters long")
      .max(20, "Password can't be longer than 20 characters")
      .matches(/[A-Z]/, "Password must have at least one uppercase letter")
      .matches(/[a-z]/, "Password must have at least one lowercase letter")
      .matches(/[0-9]/, "Password must have at least one number"),
  });

  return (
    <div className="form-container">
      <h1>Form validation with formik and yup</h1>
      <Formik
        initialValues={defaultValue}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isValid, dirty }) => (
          <Form>
            <div className="form-group">
              <Field type="text" name="name" placeholder="Enter Your Name" />
              <ErrorMessage name="name" component="p" className="error" />
            </div>
            <div className="form-group">
              <Field type="text" name="email" placeholder="Enter Your Email" />
              <ErrorMessage name="email" component="p" className="error" />
            </div>
            <div className="form-group">
              <Field
                type="password"
                name="password"
                placeholder="Enter Your Password"
              />
              <ErrorMessage name="password" component="p" className="error" />
            </div>
            <button type="submit" disabled={!isValid || !dirty}>
              Submit
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default BasicForm;
