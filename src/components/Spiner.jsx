import React from 'react';

export default ({ show }) => {
  if (!show) {
    return null;
  }
  return (
    <div className="spinner-border text-warning mt-2" role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
};
