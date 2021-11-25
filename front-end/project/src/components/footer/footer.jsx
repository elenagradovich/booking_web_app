import React from 'react';
import { Link } from 'react-router-dom';

function Footer () {
  return (
    <footer className="footer container">
      <Link className="footer__logo-link" to={MAIN}>
        <img className="footer__logo" src="img/logo.svg" alt="6 map logo" width="64" height="33"></img>
      </Link>
    </footer>
  )
};

export default Footer;
