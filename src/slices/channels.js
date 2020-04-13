/* eslint-disable no-param-reassign */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import i18next from 'i18next';
import routes from '../routes';

const addChannel = createAsyncThunk(
  'addChannel',
  async (newChannel) => {
    const url = routes.channelsPath();
    const res = await axios.post(url, newChannel);
    return res.data;
  },
);

const removeChannel = createAsyncThunk(
  'removeChannel',
  async (id) => {
    const url = routes.channelPath(id);
    const res = await axios.delete(url);
    return res.data;
  },
);

const renameChannel = createAsyncThunk(
  'renameChannel',
  async ({ id, newChannel }) => {
    const url = routes.channelPath(id);
    const res = await axios.patch(url, newChannel);
    return res.data;
  },
);

const channelsInfo = createSlice({
  name: 'chanelsInfo',
  initialState: {
    channels: [],
    currentChannelId: 1,
    pickedChannelStatus: { type: 'waiting', text: '' },
  },
  reducers: {
    changeChannel(state, action) {
      return {
        ...state,
        currentChannelId: action.payload,
      };
    },
    changeChannelStatus(state, action) {
      return {
        ...state,
        pickedChannelStatus: action.payload,
      };
    },
  },
  extraReducers: {
    [addChannel.pending]: (state, action) => {
      state.pickedChannelStatus = { type: `${action.type.split('/')[1]}`, text: i18next.t('request.load') };
    },

    [addChannel.fulfilled]: (state, action) => {
      const { data: { attributes } } = action.payload;
      state.pickedChannelStatus = { type: `${action.type.split('/')[1]}`, text: '' };
      state.channels.push(attributes);
    },

    [addChannel.rejected]: (state, action) => {
      state.pickedChannelStatus = { type: `${action.type.split('/')[1]}`, text: i18next.t('request.error') };
    },

    [removeChannel.fulfilled]: (state, action) => {
      const { payload: { data: { id } } } = action;
      if (state.currentChannelId === id) {
        state.currentChannelId = 1;
      }
      state.channels = state.channels.filter((channel) => channel.id !== id);
      state.pickedChannelStatus = { type: `${action.type.split('/')[1]}`, text: '' };
    },

    [removeChannel.rejected]: (state, action) => {
      state.pickedChannelStatus = { type: `${action.type.split('/')[1]}`, text: i18next.t('request.error') };
    },

    [renameChannel.fulfilled]: (state, action) => {
      const { payload: { data: { id, attributes } } } = action;
      state.channels = state.channels.map((channel) => (channel.id === id ? attributes : channel));
      state.pickedChannelStatus = { type: `${action.type.split('/')[1]}`, text: '' };
    },

    [renameChannel.pending]: (state, action) => {
      state.pickedChannelStatus = { type: `${action.type.split('/')[1]}`, text: i18next.t('request.load') };
    },

    [renameChannel.rejected]: (state, action) => {
      state.pickedChannelStatus = { type: `${action.type.split('/')[1]}`, text: i18next.t('request.error') };
    },
  },
});

export const channelsActions = {
  changeChannel: channelsInfo.actions.changeChannel,
  changeChannelStatus: channelsInfo.actions.changeChannelStatus,
  addChannel,
  removeChannel,
  renameChannel,
};

export default channelsInfo.reducer;