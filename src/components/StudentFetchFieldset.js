import React, { Component } from 'react';
import axios from 'axios';
import ENV from '../env';

const TIME_TO_HIDE_ERROR = 5000;

class StudentFetchFieldset extends Component {

  fetchUserInformation = async (e) => {
    e.preventDefault();
    this.props.setState({isFetching: true})
    const { studentID, studentPassword }  = this.props.state;
    await axios.post(`${ENV.url}/getStudentInformation`, {id: studentID, password: studentPassword})
    .then((result) => {
      if (result.data === "Somthing Wrong Happened") {
        throw new Error("Somthing Wrong Happened");
      }
      const { gpa, hours, points, subjects } = result.data;
      console.log(result.data);
      this.props.setState({
        gpa,
        hours: parseInt(hours),
        points,
        method: 'points',
        isFetching: false,
        subjects
      });
    })
    .catch((error) => {
      console.log(error.message);
      if (error.message === 'Somthing Wrong Happened') {
        this.props.setState({isFetching: false, isError: true, errorMessage: 'تأكد من بيانات الطالب المدخلة'});
      } else {
        this.props.setState({isFetching: false, isError: true, errorMessage: 'هنالك خطأ في الاتصال بالخادم'});
      }
      setTimeout(() => {
        this.props.setState({isError:false});
      }, TIME_TO_HIDE_ERROR)
    })
  }

  render() {
    const loadingLogo = <img className="loading-icon" align="middle" height="20" src="img/loading.svg" alt="loading-icon" /> ;

    return (
      <fieldset style={{ display: 'inline', padding: '6px 5px',}} className="student-info" dir="rtl" >
        <legend>تعبئة تلقائية</legend>
        <form onSubmit={this.fetchUserInformation}>
          <table>
            <tbody>
              <tr>
                <td>
                  <input 
                    value={this.props.state.studentID} 
                    onChange={(e) => {this.props.setState({studentID: e.target.value})}} 
                    className="student-cred-input" 
                    type="text" 
                    required 
                    maxLength="9" 
                    minLength="9" 
                    placeholder="الرقم الجامعي" 
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <input 
                    value={this.props.state.studentPassword} 
                    onChange={(e) => {this.props.setState({studentPassword: e.target.value})}} 
                    className="student-cred-input" 
                    required 
                    type="password" 
                    placeholder="كلمة المرور" 
                  />
                </td>
              </tr>
              <tr>
                <td>
                  <hr className="fetch-button-horizontal-line"/>
                  <button 
                    className="fetch-information-button" 
                    type="submit"
                  >
                    {(this.props.state.isFetching) ? loadingLogo : 'ادخال'}
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </form>
      </fieldset>
    );
  }
}

export default StudentFetchFieldset;