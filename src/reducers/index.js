import { combineReducers } from 'redux';
import messages from './messages';
import messageRequest from './messageRequest';
import channels from './channels';
import currentChannelId from './currentChannelId';

export default combineReducers({
  messages,
  messageRequest,
  channels,
  currentChannelId,
});
