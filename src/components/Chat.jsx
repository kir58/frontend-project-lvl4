/* eslint-disable import/no-cycle */
/* eslint-disable import/named */
import React, { useContext } from 'react';
import { connect } from 'react-redux';
import cn from 'classnames';
import { useFormik } from 'formik';
import { UserContext } from './App';
import { sendMessage } from '../reducers/messageRequest';

const mapStateToProps = (state) => ({
  messages: state.messages,
  messageRequest: state.messageRequest,
  currentChannelId: state.currentChannelId,
});

const mapDispatch = { sendMessage };

const Chat = ({
  messages, messageRequest, sendMessage, currentChannelId,
}) => {
  const userName = useContext(UserContext);
  const formik = useFormik({
    initialValues: {
      message: '',
    },

    onSubmit: (values, { setSubmitting, resetForm }) => {
      const message = { data: { attributes: values } };
      sendMessage({ message, channelId: currentChannelId });
      setSubmitting(false);
      resetForm();
    },
  });


  const renderMessage = ({ message, id }) => (
    <div key={id}>
      <b>{userName}</b>
      {`: ${message}`}
    </div>
  );

  const renderMessages = () => (
    <div id="messages-box" className="chat-messages overflow-auto mb-3">
      <div>
        {messages.map((item) => renderMessage(item))}
      </div>
    </div>
  );

  const renderInput = () => {
    const { type, text } = messageRequest;
    const invalidHtml = type === 'sendMessages/rejected' && <div className="d-block invalid-feedback">{text}</div>;

    const inputCLass = cn({
      'form-control': true,
      'is-invalid': type === 'sendMessages/rejected',
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
            {invalidHtml}
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
