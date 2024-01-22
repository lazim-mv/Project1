import React from "react";

const NewHeader = () => {
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
          <a href="#" class="selected">
            Blog
          </a>
          <a href="#">Pricing</a>
          <a href="#">About</a>
          <a href="#">Faq</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </header>
  );
};

export default NewHeader;
