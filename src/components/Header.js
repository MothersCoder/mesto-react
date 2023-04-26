import React from 'react';
import logo from '../images/header-logo.svg'

function Header() {
  return (
    <header className="header">
      <a className="header__link" href="#"><img className="header__logo" src={logo} alt="Логотип сайта &quot;Место (Россия)&quot;" /></a>
    </header>
  );
}

export default Header;
