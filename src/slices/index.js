import { combineReducers } from 'redux';
import messagesInfo from './messages';
import channelsInfo from './channels';

export default combineReducers({
  messagesInfo,
  channelsInfo,
});
