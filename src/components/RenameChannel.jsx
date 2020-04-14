import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useFormik } from 'formik';
import { useTranslation } from 'react-i18next';
import cn from 'classnames';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { channelsActions } from '../slices/channels';

const mapStateToProps = (state) => ({
  pickedChannelStatus: state.channelsInfo.pickedChannelStatus,
  channels: state.channelsInfo.channels,

});

const mapDispatch = {
  renameChannel: channelsActions.renameChannel,
  changeChannelStatus: channelsActions.changeChannelStatus,
};

const RenameChannel = ({
  id,
  currentName,
  channels,
  pickedChannelStatus: { type, text },
  changeChannelStatus,
  renameChannel,
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
    enableReinitialize: true,
    initialValues: {
      name: currentName,
    },

    onSubmit: ({ name }, { setSubmitting, resetForm }) => {
      const isChannelExist = channels.some((channel) => channel.name === name);
      if (isChannelExist) {
        const status = { type: 'channelExist', text: t('channels.existingChannelName') };
        changeChannelStatus({ status });
      } else if (currentName === name) {
        const status = { type: 'channelExist', text: t('channels.equalName') };
        changeChannelStatus({ status });
      } else {
        const attributes = { name };
        const newChannel = { data: { attributes } };
        renameChannel({ id, newChannel });
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
    const status = { type: 'waiting', text: '' };
    changeChannelStatus({ status });
    handleShow();
  };

  return (
    <>
      <button type="button" className="btn btn-link p-0 ml-auto" onClick={openModal}>&#9998;</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.rename.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <form onSubmit={formik.handleSubmit}>
            <div className="form-group">
              <label htmlFor="name" className="label">{t('modal.rename.label')}</label>
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
              {t('button.rename')}
            </Button>
          </form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatch)(RenameChannel);
