import React, { Component } from 'react';

class Error extends Component {
  render() {
    return (
      <div className="error-div">
        <h3 className="error-text">{this.props.errorMessage}</h3>
      </div>
    );
  }
}

export default Error;