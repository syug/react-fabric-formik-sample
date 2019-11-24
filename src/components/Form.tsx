import * as React from "react";
import { Formik } from "formik";

const Form = ({ children, ...props }) => {
  const initialValues = {
    canvas: {
      objects: [
        {
          left: 100,
          top: 100,
          fill: "red",
          width: 20,
          height: 20
        },
        {
          left: 200,
          top: 100,
          fill: "blue",
          width: 20,
          height: 20
        }
      ]
    }
  };

  const handleSubmit = React.useCallback((values, { setSubmitting }) => {
    alert(JSON.stringify(values, null, 2));
    setSubmitting(false);
  }, []);

  return (
    <Formik initialValues={initialValues} onSubmit={handleSubmit}>
      {formik => (
        <form onSubmit={formik.handleSubmit}>{children ? children : null}</form>
      )}
    </Formik>
  );
};

export default Form;
