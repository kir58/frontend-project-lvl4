import React, { useState } from 'react';
import { useFormik } from 'formik';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ModalChannel = ({ title, label, onSubmit }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

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
    <>
      <button type="button" className="btn btn-link p-0 ml-auto" onClick={handleShow}>+</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
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
            <Button variant="secondary" onClick={handleClose}>
              Отменить
            </Button>
            <Button variant="primary" type="submit">
              Сохранить
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalChannel;
