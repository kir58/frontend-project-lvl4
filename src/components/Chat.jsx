/* eslint-disable import/no-cycle */
/* eslint-disable import/named */
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { useFormik } from 'formik';
import UserContext from '../UserContex';
import { messagesAction } from '../slices/messages';

const mapStateToProps = (state) => ({
  messages: state.messagesInfo.messages,
  messageRequest: state.messagesInfo.messageRequest,
  currentChannelId: state.channelsInfo.currentChannelId,
});

const mapDispatch = { sendMessage: messagesAction.sendMessage };

const Chat = ({
  messages, messageRequest, sendMessage, currentChannelId,
}) => {
  const userName = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      message: '',
    },

    onSubmit: (values, { setSubmitting, resetForm }) => {
      const attributes = { message: values.message, name: userName };
      const message = { data: { attributes } };
      sendMessage({ message, channelId: currentChannelId });
      setSubmitting(false);
      resetForm();
    },
  });


  const renderMessage = ({ message, id, name }) => (
    <div key={id}>
      <b>{name}</b>
      {`: ${message}`}
    </div>
  );

  const renderMessages = () => (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      <div>
        {messages
          .filter((item) => item.channelId === currentChannelId)
          .map((item) => renderMessage(item))}
      </div>
    </div>
  );

  const renderInput = () => {
    const { type, text } = messageRequest;
    const messageStatusClasses = cn({
      'd-block': true,
      'invalid-feedback': type === 'sendMessage/rejected',
      'text-warning': type === 'sendMessage/pending',
    });

    const inputCLass = cn({
      'form-control': true,
      'is-invalid': type === 'sendMessage/rejected',
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
            <div className={messageStatusClasses}>{text}</div>
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

export default connect(mapStateToProps, mapDispatch)(Chat);
