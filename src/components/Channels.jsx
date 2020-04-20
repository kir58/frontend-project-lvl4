import React from 'react';
import cn from 'classnames';
import { useTranslation } from 'react-i18next';
import { useSelector, useDispatch } from 'react-redux';
import { channelsActions } from '../slices/channels';
import { modalAction } from '../slices/modalInfo';
import { getCurrentChannelId, getModalInfo, getChannels } from '../selectors';
import getModal from './modals/index.js';


const renderModal = ({ type }) => {
  if (!type) {
    return null;
  }

  const Component = getModal(type);
  return <Component />;
};

const Channels = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();

  const currentChannelId = useSelector((state) => getCurrentChannelId(state));
  const channels = useSelector((state) => getChannels(state));
  const modalInfo = useSelector((state) => getModalInfo(state));

  const getChannelClasses = (id) => cn({
    'nav-link btn btn-block': true,
    active: id === currentChannelId,
  });

  const handleChangeChannel = (id) => () => dispatch(channelsActions.changeChannel({ id }));

  const rednerItem = (item) => (
    <li className="nav-item d-flex" key={item.id}>
      <button className={getChannelClasses(item.id)} type="button" onClick={handleChangeChannel(item.id)}>
        {item.name}
      </button>
      {item.removable && (
      <>
        <button
          type="button"
          className="btn btn-link p-0 ml-auto"
          onClick={() => dispatch(modalAction.setModalInfo({ type: 'renaming', currentItem: item }))}
        >
          &#9998;
        </button>
        <button
          type="button"
          className="btn btn-link p-0 ml-auto"
          onClick={() => dispatch(modalAction.setModalInfo({ type: 'removing', currentItem: item }))}
        >
          &#65794;
        </button>
      </>
      )}
    </li>
  );

  return (
    <div className="col-3 border-right">
      <div className="d-flex mb-2">
        <span>{t('channels.title')}</span>
        <button type="button" className="btn btn-link p-0 ml-auto" onClick={() => dispatch(modalAction.setModalInfo({ type: 'adding' }))}>+</button>
      </div>
      <ul className="nav flex-column nav-pills nav-fill">
        {channels.map((item) => rednerItem(item))}
      </ul>
      {renderModal(modalInfo)}
    </div>
  );
};

export default Channels;
