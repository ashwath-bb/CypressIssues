import React, { Component } from "react";

class Header extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="header">
        <div className="navbar navbar-expand-lg box-shadow">
          <div className="container">
            <a className="navbar-brand">{"Wheel"}</a>

            <div
              className="collapse navbar-collapse"
              id="navbarSupportedContent"
            >
              <div className="navbar-nav ml-auto">
                <p className="text-right">LogOut</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default Header;
