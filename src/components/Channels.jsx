import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { connect } from 'react-redux';
import { channelsActions } from '../slices/channels';

import AddChannel from './AddChannel';
import RenameChannel from './RenameChannel';
import RemoveChannel from './RemoveChannel';

const mapStateToProps = (state) => ({
  channels: state.channelsInfo.channels,
  currentChannelId: state.channelsInfo.currentChannelId,
});

const mapDispatch = {
  changeChannel: channelsActions.changeChannel,
};

const Channels = ({
  channels,
  currentChannelId,
  changeChannel,
}) => {
  const { t } = useTranslation();
  const getChannelClasses = (id) => cn({
    'nav-link btn btn-block': true,
    active: id === currentChannelId,
  });

  const handleChangeChannel = (id) => () => {
    changeChannel(id);
  };

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('channels.title')}</span>
        <AddChannel />
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map(({ id, name, removable }) => (
          <li className="nav-item d-flex" key={id}>
            <button className={getChannelClasses(id)} type="button" onClick={handleChangeChannel(id)}>
              {name}
            </button>
            {removable && (
            <>
              <RenameChannel
                id={id}
                currentName={name}
              />
              <RemoveChannel
                id={id}
                currentName={name}
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
