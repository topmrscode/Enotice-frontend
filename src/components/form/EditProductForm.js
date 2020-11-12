import React, { useRef, useEffect } from "react";
import { Label, FormGroup } from "reactstrap";
import { Formik, Form, Field } from "formik";
import IntlMessages from "../../helpers/IntlMessages";

export default function EditProductForm({
  onSubmit: handleSubmit,
  error,
  initialValues,
  validators,
  onChangeFile,
  setRef,
}) {
  const specialRef = useRef();
  useEffect(() => {
    setRef(specialRef);
  }, [specialRef]);

  return (
    <div>
      {error && <p style={{ color: "red" }}>{error}</p>}
      <Formik
        ref={specialRef}
        initialValues={{
          file: initialValues.file,
          reference: initialValues.reference,
          videoId: initialValues.videoId,
        }}
        onSubmit={handleSubmit}
      >
        {({ errors, touched }) => (
          <Form className="av-tooltip tooltip-label-bottom">
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="products.add-reference" />
              </Label>
              <Field
                className="form-control"
                name="reference"
                validate={validators.validateReference}
              />
              {errors.reference && touched.reference && (
                <div className="invalid-feedback d-block">
                  {errors.reference}
                </div>
              )}
            </FormGroup>
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="products.add-videoId" />
              </Label>
              <Field
                className="form-control"
                name="videoId"
                validate={validators.validateVideoId}
              />
              {errors.videoId && touched.videoId && (
                <div className="invalid-feedback d-block">{errors.videoId}</div>
              )}
            </FormGroup>
            <FormGroup className="form-group has-float-label">
              <Label>
                <IntlMessages id="products.add-file" />
              </Label>
              <input
                className="form-control"
                type="file"
                name="file"
                onChange={(event) => {
                  onChangeFile(event);
                }}
              />
            </FormGroup>
          </Form>
        )}
      </Formik>
    </div>
  );
}
