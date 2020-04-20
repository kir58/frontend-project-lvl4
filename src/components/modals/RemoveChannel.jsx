import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import routes from '../../routes';
import { modalAction } from '../../slices/modalInfo';
import Spiner from '../Spiner';

const mapStateToProps = (state) => ({
  currentItem: state.modalInfo.currentItem,
});

const mapDispatch = {
  onHide: () => modalAction.setModalInfo({ type: null, currentItem: null }),
};


const removeChannel = ({ onHide, currentItem: { name, id } }) => {
  const [requestStatus, setRequestStatus] = useState(false);
  const [error, setError] = useState('');

  const { t } = useTranslation();

  const handleRemoveChannelSubmit = async (e) => {
    e.preventDefault();
    setRequestStatus(true);
    try {
      const url = routes.channelPath(id);
      await axios.delete(url);
      onHide();
    } catch (er) {
      setRequestStatus(false);
      setError(t('request.error'));
    }
  };

  const invalidHtml = error && <div className="d-block invalid-feedback">{error}</div>;

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.remove.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {`${t('modal.remove.label')} #${name}?`}
        {invalidHtml}
        <Spiner show={requestStatus} />
      </Modal.Body>
      <Modal.Footer>
        <form onSubmit={handleRemoveChannelSubmit}>
          <div className="form-group">
            <Button className="mr-3" variant="secondary" onClick={onHide}>
              {t('button.no')}
            </Button>
            <Button variant="primary" type="submit">
              {t('button.yes')}
            </Button>
          </div>
        </form>
      </Modal.Footer>
    </Modal>

  );
};

export default connect(mapStateToProps, mapDispatch)(removeChannel);
