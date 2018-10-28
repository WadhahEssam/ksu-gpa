import React, { Component } from 'react';

class Header extends Component {
  render () {
    const error = (
      <div className="error-div">
        <h3 className="error-text">{this.props.errorMessage}</h3>
      </div>
    );
    const ksuLogo = (
      <div >
        <img fill="#4089A9" align="middle" id="logo" src="img/logo.svg" alt="ksu-logo" />
      </div>
    );
    return (
      <div>
        {(this.props.isError) ? error : ksuLogo}
      </div>
    );
  }
}

export default Header;