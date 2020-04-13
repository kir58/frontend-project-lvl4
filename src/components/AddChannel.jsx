import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { channelsActions } from '../slices/channels';

const mapStateToProps = (state) => ({
  channels: state.channelsInfo.channels,
  pickedChannelStatus: state.channelsInfo.pickedChannelStatus,

});

const mapDispatch = {
  addChannel: channelsActions.addChannel,
  changeChannelStatus: channelsActions.changeChannelStatus,
};

const AddChannel = ({
  channels,
  pickedChannelStatus: { type, text },
  changeChannelStatus,
  addChannel,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { t } = useTranslation();

  useEffect(() => {
    if (type === 'fulfilled') {
      handleClose();
    }
  }, [type]);


  const formik = useFormik({
    initialValues: {
      name: '',
    },
    onSubmit: ({ name }, { setSubmitting, resetForm }) => {
      const isChannelExist = channels.some((channel) => channel.name === name);
      if (isChannelExist) {
        const status = { type: 'channelExist', text: t('channels.existingChannelName') };
        changeChannelStatus(status);
      } else {
        const attributes = { name };
        const newChannel = { data: { attributes } };
        addChannel(newChannel);
      }

      setSubmitting(false);
      resetForm();
    },
  });

  const classesStatusChannel = cn({
    'd-block': true,
    'invalid-feedback': type === 'rejected' || type === 'channelExist',
    'text-warning': type === 'pending',
  });

  const openModal = () => {
    changeChannelStatus({ type: 'waiting', text: '' });
    handleShow();
  };

  return (
    <>
      <button type="button" className="btn btn-link p-0 ml-auto" onClick={openModal}>+</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.create.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="label">{t('modal.create.label')}</label>
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
              <div className={classesStatusChannel}>{text}</div>
            </div>
            <Button variant="secondary mr-3" onClick={handleClose}>
              {t('button.cancel')}
            </Button>
            <Button variant="primary" type="submit" disabled={type === 'pending'}>
              {t('button.create')}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatch)(AddChannel);
