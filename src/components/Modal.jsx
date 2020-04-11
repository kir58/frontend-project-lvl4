import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import FormForModal from './FormForModal';

const ModalChannel = ({
  title, label, onSubmit, withForm, bodyText, buttonOpenText,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);


  const defaultFormContentHtml = (
    <>
      <Modal.Body>{bodyText}</Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отменить
        </Button>
        <Button variant="primary" onClick={onSubmit}>
          Подтвердить
        </Button>
      </Modal.Footer>
    </>
  );
  const contentFormHtml = withForm ? (
    <FormForModal
      onSubmit={onSubmit}
      handleClose={handleClose}
      label={label}
    />
  ) : defaultFormContentHtml;
  return (
    <>
      <button type="button" className="btn btn-link p-0 ml-auto" onClick={handleShow}>{buttonOpenText}</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        {contentFormHtml}
      </Modal>
    </>
  );
};

export default ModalChannel;
