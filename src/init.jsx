
import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import io from 'socket.io-client';
import gon from 'gon';

import App from './components/App';
import rootReducer from './slices';
import { messagesAction } from './slices/messages';
import { channelsActions } from './slices/channels';

import getUserName from '../lib/getUserName';
import UserContext from './UserContex';

export default () => {
  const store = configureStore({
    reducer: rootReducer,
    preloadedState: {
      messagesInfo: { messages: gon.messages, messageRequest: { type: 'waiting', text: '' } },
      channelsInfo: {
        channels: gon.channels,
        currentChannelId: gon.currentChannelId,
        pickedChannelStatus: { type: 'waiting', text: '' },
      },
    },
  });


  const socket = io();
  socket.on('newMessage', (data) => store.dispatch(messagesAction.messageRecieved(data)));
  socket.on('newChannel', (data) => store.dispatch(channelsActions.receiveAddedChanel(data)));
  socket.on('removeChannel', (data) => store.dispatch(channelsActions.receiveRemovedChanel(data)));
  socket.on('renameChannel', (data) => store.dispatch(channelsActions.receiveRenamedChanel(data)));

  ReactDOM.render(
    <Provider store={store}>
      <UserContext.Provider value={getUserName()}>
        <App />
      </UserContext.Provider>
    </Provider>,
    document.getElementById('chat'),
  );
};
