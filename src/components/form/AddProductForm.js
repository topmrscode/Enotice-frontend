import React, { useState, useRef, useEffect } from "react";
import { Label, FormGroup, Button } from "reactstrap";
import { Formik, Form, Field, submitForm } from "formik";
import IntlMessages from "../../helpers/IntlMessages";

export default function AddProductForm({
  onSubmit: handleSubmit,
  error,
  initialValues,
  validators,
  props,
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
          reference: initialValues.reference,
          videoId: initialValues.videoId,
          fileUrl: initialValues.fileUrl,
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
                <IntlMessages id="products.add-fileUrl" />
              </Label>
              <Field
                className="form-control"
                name="fileUrl"
                validate={validators.validateFileUrl}
              />
              {errors.fileUrl && touched.fileUrl && (
                <div className="invalid-feedback d-block">{errors.fileUrl}</div>
              )}
            </FormGroup>
            <div className="d-flex justify-content-between align-items-center">
              <span />
              {/* <Button
                color="primary"
                className={`btn-shadow btn-multiple-state btn-square ${
                  props.loading ? "show-spinner" : ""
                }`}
                size="lg"
              >
                <span className="spinner d-inline-block">
                  <span className="bounce1" />
                  <span className="bounce2" />
                  <span className="bounce3" />
                </span>
                <span className="label">
                  <IntlMessages id="product.add-submit" />
                </span>
              </Button> */}
            </div>
          </Form>
        )}
      </Formik>
    </div>
  );
}
