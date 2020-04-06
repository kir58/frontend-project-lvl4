import React from 'react';
import ReactDOM from 'react-dom';

import Channels from './Channels';

export default (gon) => {
  ReactDOM.render(
    <div>
      <Channels channels={gon.channels} />
    </div>,
    document.getElementById('chat'),
  );
};
