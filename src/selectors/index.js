import { createSelector } from 'reselect';

const getMessages = (state) => state.messagesInfo.messages;
export const getChannels = (state) => state.channelsInfo.channels;

export const getCurrentChannelId = (state) => state.channelsInfo.currentChannelId;

export const getModalInfo = (state) => state.modalInfo;

export const getCurrentChannelMessages = createSelector(
  [getCurrentChannelId, getMessages],
  (currentChannelId, messages) => messages
    .filter(({ channelId }) => channelId === currentChannelId),
);
