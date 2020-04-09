import React from 'react';
import cn from 'classnames';
import { connect } from 'react-redux';

const mapStateToProps = (state) => ({
  channels: state.channels,
  currentChannelId: state.currentChannelId,

});

const mapDispatch = { };

const Channels = ({ channels, currentChannelId }) => {
  const getChannelClasses = (id) => cn({
    'nav-link btn btn-block': true,
    active: id === currentChannelId,
  });

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>Channels</span>
        <button type="button" className="btn btn-link p-0 ml-auto">+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name }) => (
          <li className="nav-item" key={id}>
            <button className={getChannelClasses(id)} type="button">{name}</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default connect(mapStateToProps, mapDispatch)(Channels);
