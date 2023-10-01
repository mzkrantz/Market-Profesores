import React from 'react';
import './SpacerTopResponsive.css';

const SpacerTop = ({ children }) => {
  return (
    <div className='spacerTop'>
      <div className='spacerContent'>{children}</div>
    </div>
  );
};

export default SpacerTop;
