import React from "react";

const Header = () => {
  return (
    <header class="header-fixed">
      <div class="header-limiter">
        <div className="logoContainer">
          <a href="#">
            Company<span>logo</span>
          </a>
        </div>

        <div className="headerList">
          <a href="#">Home</a>
          <a href="#">Products</a>
          <a href="#">Accounts</a>
          <a href="#">Logout</a>
        </div>
      </div>
    </header>
  );
};

export default Header;
