import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useTranslation } from 'react-i18next';
import { channelsActions } from '../slices/channels';

const mapStateToProps = (state) => ({
  pickedChannelStatus: state.channelsInfo.pickedChannelStatus,

});

const mapDispatch = {
  removeChannel: channelsActions.removeChannel,
  changeChannelStatus: channelsActions.changeChannelStatus,
};

const RemoveChannel = ({
  currentName, id, removeChannel, pickedChannelStatus: { type, text }, changeChannelStatus,
}) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const { t } = useTranslation();

  const openModal = () => {
    changeChannelStatus({ type: 'waiting', text: '' });
    handleShow();
  };

  useEffect(() => {
    if (type === 'fulfilled') {
      handleClose();
    }
  }, [type]);

  const handleRemoveChannel = () => {
    removeChannel(id);
  };

  const invalidHtml = type === 'rejected' && <div className="d-block invalid-feedback">{text}</div>;

  return (
    <>
      <button type="button" className="btn btn-link p-0 ml-auto" onClick={openModal}>&#65794;</button>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{t('modal.remove.title')}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {`${t('modal.remove.label')} #${currentName}?`}
          {invalidHtml}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            {t('button.no')}
          </Button>
          <Button variant="primary" onClick={handleRemoveChannel}>
            {t('button.yes')}
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default connect(mapStateToProps, mapDispatch)(RemoveChannel);
