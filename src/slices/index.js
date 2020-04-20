import { combineReducers } from 'redux';
import messagesInfo from './messages';
import channelsInfo from './channels';
import modalInfo from './modalInfo';

export default combineReducers({
  messagesInfo,
  channelsInfo,
  modalInfo,
});
