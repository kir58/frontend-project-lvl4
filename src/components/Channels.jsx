import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';
import { changeChannel } from '../reducers/currentChannelId';
import { addChanel } from '../reducers/chanelsRequests';
import Modal from './Modal';

const mapStateToProps = (state) => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,

});

const mapDispatch = { changeChannel, addChanel };

const Channels = ({
  channels, currentChannelId, changeChannel, addChanel,
}) => {
  const getChannelClasses = (id) => cn({
    'nav-link btn btn-block': true,
    active: id === currentChannelId,
  });

  const handleChangeChannel = (id) => () => {
    changeChannel(id);
  };

  const handleAddChanel = ({ name }) => {
    const attributes = { name };
    const newChannel = { data: { attributes } };
    addChanel(newChannel);
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <Modal title={'Добавить канал'} label="Введите имя канала" onSubmit={handleAddChanel} />
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => (
          <li className="nav-item" key={id}>
            <button className={getChannelClasses(id)} type="button" onClick={handleChangeChannel(id)}>{name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatch)(Channels);
