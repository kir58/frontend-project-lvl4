import React, { useContext } from 'react';
import { useSelector } from 'react-redux';
import cn from 'classnames';
import { useFormik } from 'formik';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import UserContext from '../UserContex';
import routes from '../routes';
import Spiner from './Spiner';


const generateOnSubmit = (channelId, userName, getText) => async (
  { message }, { setFieldError, resetForm },
) => {
  const attributes = { message, name: userName };
  const newMessage = { data: { attributes } };

  try {
    const url = routes.channelMessagesPath(channelId);
    await axios.post(url, newMessage);
  } catch (e) {
    setFieldError('nameError', getText('request.error'));
  }
  resetForm();
};


const Chat = () => {
  const { t } = useTranslation();
  const userName = useContext(UserContext);

  const { currentChannelId } = useSelector((state) => state.channelsInfo);
  const messagesInfo = useSelector((state) => state.messagesInfo);
  const messages = messagesInfo.messages.filter(({ channelId }) => channelId === currentChannelId);

  const formik = useFormik({ initialValues: { message: '' }, onSubmit: generateOnSubmit(currentChannelId, userName, t) });

  const renderMessages = () => (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      <div>
        {messages.map(({ message, id, name }) => (
          <div key={id}>
            <b>{name}</b>
            {`: ${message}`}
          </div>
        ))}
      </div>
    </div>
  );

  const renderInput = () => {
    const inputCLass = cn({
      'form-control': true,
      'is-invalid': !!formik.errors.nameError,
    });

    return (
      <div className="mt-auto">
        <form onSubmit={formik.handleSubmit}>
          <div className="form-group">
            <div className="input-group">
              <input
                className={inputCLass}
                name="message"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.message}
                required
              />
            </div>
            <Spiner show={formik.isSubmitting} />
            <div className="d-block invalid-feedback">{formik.errors.nameError}</div>
          </div>
        </form>
      </div>
    );
  };

  return (
    <div className="col h-100">
      <div className="d-flex flex-column h-100">
        {renderMessages()}
        {renderInput()}
      </div>
    </div>
  );
};

export default Chat;
