import React from 'react';
import {createPortal} from 'react-dom';

import './backdrop.scss';

const Backdrop = (props) => createPortal(
  <div className="backdrop" onClick={props.onClick}></div>,
  document.getElementById('backdrop-hook'),
);


export default Backdrop;
