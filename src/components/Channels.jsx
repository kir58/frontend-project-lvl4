import React from 'react';

export default ({ channels }) => {
  if (!channels.length) {
    return null;
  }

  return (
    <ul className="nav flex-column nav-pills">
      {channels.map(({ id, name }) => (
        <li className="nav-item" key={id}>{name}</li>
      ))}
    </ul>
  );
};
