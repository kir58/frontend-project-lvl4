import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { channelsActions } from '../reducers/channels';
import Modal from './Modal';

const mapStateToProps = (state) => ({
  channels: state.channelsInfo.channels,
  currentChannelId: state.channelsInfo.currentChannelId,

});

const mapDispatch = {
  changeChannel: channelsActions.changeChannel,
  addChannel: channelsActions.addChannel,
  removeChannel: channelsActions.removeChannel,
  renameChannel: channelsActions.renameChannel,
};

const Channels = ({
  channels, currentChannelId, changeChannel, addChannel, removeChannel, renameChannel,
}) => {
  const getChannelClasses = (id) => cn({
    'nav-link btn btn-block': true,
    active: id === currentChannelId,
  });

  const handleChangeChannel = (id) => () => {
    changeChannel(id);
  };

  const handleAddChannel = ({ name }) => {
    const attributes = { name };
    const newChannel = { data: { attributes } };
    addChannel(newChannel);
  };

  const handleRenameChannel = (id) => ({ name }) => {
    const attributes = { name };
    const newChannel = { data: { attributes } };
    renameChannel({ id, newChannel });
  };

  const handleRemoveChannel = (id) => () => removeChannel(id);

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <Modal
          buttonOpenText="+"
          title="Добавить канал"
          label="Введите имя канала"
          onSubmit={handleAddChannel}
          withForm
        />
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name, removable }) => (
          <li className="nav-item d-flex" key={id}>
            <button className={getChannelClasses(id)} type="button" onClick={handleChangeChannel(id)}>
              {name}
            </button>
            {removable && (
            <>
              <Modal
                title="Изменить имя канала"
                label="Введите новое имя канала"
                onSubmit={handleRenameChannel(id)}
                buttonOpenText="&#9998;"
                withForm
              />
              <Modal
                title="Удалить канал"
                onSubmit={handleRemoveChannel(id)}
                bodyText="Вы действительно хотите удалить канал?"
                buttonOpenText="&#65794;"
              />
            </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatch)(Channels);
