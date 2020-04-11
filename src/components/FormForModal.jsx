import React from 'react';
import { useFormik } from 'formik';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const FormForModal = ({ onSubmit, handleClose, label }) => {
  const formik = useFormik({
    initialValues: {
      name: '',
    },

    onSubmit: (values, { setSubmitting, resetForm }) => {
      const props = { name: values.name };
      onSubmit(props);
      setSubmitting(false);
      resetForm();
      handleClose();
    },
  });
  return (
    <Modal.Body>
      <form onSubmit={formik.handleSubmit}>
        <div className="form-group">
          <label htmlFor="name" className="label">{label}</label>
          <div className="input-group">
            <input
              className="form-control"
              name="name"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
              required
            />
          </div>
        </div>
        <Button variant="secondary mr-3" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="primary" type="submit">
          Подтвердить
        </Button>
      </form>
    </Modal.Body>
  );
};

export default FormForModal;
