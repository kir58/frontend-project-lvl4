import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import gon from 'gon';
import axios from 'axios';
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
  initialState: { channels: gon.channels, currentChannelId: gon.currentChannelId },
  reducers: {
    changeChannel(state, action) {
      return {
        ...state,
        currentChannelId: action.payload,
      };
    },
  },
  extraReducers: {
    [addChannel.fulfilled]: (state, action) => {
      const { data: { attributes } } = action.payload;
      state.channels.push(attributes);
    },
    [removeChannel.fulfilled]: (state, action) => {
      const { payload: { data: { id } } } = action;
      return {
        ...state,
        channels: state.channels.filter((channel) => channel.id !== id),
      };
    },
    [renameChannel.fulfilled]: (state, action) => {
      const { payload: { data: { id, attributes } } } = action;
      return {
        ...state,
        channels: state.channels.map((channel) => (channel.id === id ? attributes : channel)),
      };
    },
  },
});

export const channelsActions = {
  changeChannel: channelsInfo.actions.changeChannel,
  addChannel,
  removeChannel,
  renameChannel,
};

export default channelsInfo.reducer;
