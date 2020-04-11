/* eslint-disable react/jsx-filename-extension */
// @ts-nocheck

import { configureStore } from '@reduxjs/toolkit';
import { Provider } from 'react-redux';
import ReactDOM from 'react-dom';
import React from 'react';
import io from 'socket.io-client';
import App from './components/App';
import rootReducer from './reducers';
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import { messagesAction } from './reducers/messages';
import '../assets/application.scss';


if (process.env.NODE_ENV !== 'production') {
  localStorage.debug = 'chat:*';
}


const store = configureStore({
  reducer: rootReducer,
});

const socket = io();
socket.on('newMessage', (data) => store.dispatch(messagesAction.messageRecieved(data)));

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('chat'),
);
