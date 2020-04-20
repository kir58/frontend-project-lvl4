import React, { useEffect, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { useFormik } from 'formik';
import { connect } from 'react-redux';
import axios from 'axios';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import routes from '../../routes';
import { modalAction } from '../../slices/modalInfo';
import Spiner from '../Spiner';

const mapStateToProps = (state) => ({
  channels: state.channelsInfo.channels,
  currentItem: state.modalInfo.currentItem,
});

const mapDispatch = {
  onHide: () => modalAction.setModalInfo({ type: null, currentItem: null }),
};

const generateOnSubmit = ({ onHide, currentItem }, getText) => async (
  { name },
  { setStatus, setFieldError },
) => {
  const attributes = { name };
  const newChannel = { data: { attributes } };
  setStatus('loading');
  try {
    await axios.patch(routes.channelPath(currentItem.id), newChannel);
    setStatus('');
    onHide();
  } catch (e) {
    setFieldError('nameError', getText('request.error'));
    setStatus('');
  }
};

const generateValidate = ({ channels }, getText) => ({ name }) => {
  const isChannelExist = channels.some((channel) => channel.name === name);
  return isChannelExist ? { nameError: getText('channels.existingChannelName') } : {};
};

const renameChannel = (props) => {
  const { onHide, currentItem } = props;
  const { t } = useTranslation();

  const formik = useFormik({
    onSubmit: generateOnSubmit(props, t),
    initialValues: { name: currentItem.name },
    validate: generateValidate(props, t),
  });

  const inputRef = useRef();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
      inputRef.current.select();
    }
  }, [null]);

  return (
    <Modal show onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>{t('modal.rename.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <label htmlFor="name" className="label">{`${t('modal.rename.label')} #${currentItem.name}`}</label>
            <div className="input-group">
              <input
                className="form-control"
                name="name"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.name}
                required
                ref={inputRef}
              />
            </div>
            <Spiner show={formik.status === 'loading'} />
            <div className="d-block invalid-feedback">{formik.errors.nameError}</div>
          </div>
          <Button variant="secondary mr-3" onClick={onHide}>
            {t('button.cancel')}
          </Button>
          <Button variant="primary" type="submit" disabled={formik.errors.nameError}>
            {t('button.rename')}
          </Button>
        </form>
      </Modal.Body>
    </Modal>

  );
};

export default connect(mapStateToProps, mapDispatch)(renameChannel);
