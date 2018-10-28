import React, { Component } from 'react';

class StudentFetchFieldset extends Component {

  render() {
    const loadingLogo = <img className="loading-icon" align="middle" height="20" src="img/loading.svg" alt="loading-icon" /> ;

    return (
      <fieldset style={{ display: 'inline', maxWidth: '80px', padding: '6px 5px',}} className="student-info" dir="rtl" >
        <legend>تعبئة تلقائية</legend>
          <form onSubmit={this.props.fetchUserInformation}>
          <table>
            <tbody>
              <tr>
                <td><input value={this.props.state.studentID} onChange={(e) => {this.props.setState({studentID: e.target.value})}} className="student-cred-input" type="text" required maxLength="9" minLength="9" placeholder="الرقم الجامعي" /></td>
              </tr>
              <tr>
                <td><input value={this.props.state.studentPassword} onChange={(e) => {this.props.setState({studentPassword: e.target.value})}} className="student-cred-input" required type="password" placeholder="كلمة المرور" /></td>
              </tr>
              <tr>
                <td><hr className="fetch-button-horizontal-line"/><button className="fetch-information-button" type="submit">{(this.props.state.isFetching) ? loadingLogo : 'ادخال'}</button></td>
              </tr>
            </tbody>
          </table>
        </form>
      </fieldset>
    );
  }
}

export default StudentFetchFieldset;