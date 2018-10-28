import React, { Component } from 'react';
import CurrentCalculation from './components/CurrentCalculation';
import TotalCalculation from './components/TotalCalculation';
import StudentInformationFieldset from './components/StudentInfomationFieldset';
import StudentFetchFieldset from './components/StudentFetchFieldset';
import SubjectsTable from './components/SubjectsTable';
import AddRemoveButtons from './components/AddRemoveButtons';
import Footer from './components/Footer';
import Header from './components/Header';


const NUMBER_OF_DEFAULT_SUBJECTS = 5;
const TIME_TO_HIDE_ERROR = 5000;

class App extends Component {
  state = {
    subjects: [],
    hours: '',
    gpa: '',
    points: '',
    method: 'gpa',
    studentID: '',
    studentPassword: '',
    isFetching: false,
    isError: false,
    errorMessage: 'حدث خطأ',
  }

  componentWillMount() {
    // check if there is data in the local storage
    const storageState = JSON.parse(localStorage.getItem("state"));
    if (storageState===null) {
      // adding the default empty subjects
      let subjects = [];
      for (let i = 0; i < NUMBER_OF_DEFAULT_SUBJECTS; i++) {
        subjects.push({
          id: i,
          name: '',
          hours: '2',
          grade: 'A+',
          checked: true,
        });
      }
      this.setState({subjects});
    } else {
      this.setState({
        subjects: storageState.subjects,
        hours: storageState.hours,
        gpa: storageState.gpa,
        points: storageState.points,
        method: storageState.method
      });
    }
  }

  componentDidUpdate() {
    localStorage.setItem("state", JSON.stringify(this.state));
  }

  render() {
    const orDiv = (
      <div className="or-div" style={{display: 'inline'}}>
        <h3 style={{display: 'inline'}}>او</h3>
      </div>
    );

    return (
      <div>
        <Header isError={this.state.isError} errorMessage={this.state.errorMessage} />
        <div className="main-container" >
          {/* Student Information */}
          <StudentFetchFieldset timeToHideError={TIME_TO_HIDE_ERROR} setState={(newState) => {this.setState(newState)}} state={this.state} fetchUserInformation={(e) => {this.fetchUserInformation(e)}} />
          {orDiv}
          <StudentInformationFieldset setState={(newState) => {this.setState(newState)}} state={this.state} />

          {/* Subjects Table */}
          <SubjectsTable setState={(newState) => {this.setState(newState)}} state={this.state} />
          <AddRemoveButtons setState={(newState) => {this.setState(newState)}} state={this.state} />

          {/* Results */}
          <CurrentCalculation state={this.state} />
          <TotalCalculation state={this.state} />
        </div>
        <Footer />
      </div>
    );
  }


}

export default App;
