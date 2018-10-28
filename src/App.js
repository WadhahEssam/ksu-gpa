import React, { Component } from 'react';
import axios from 'axios';
import { cloneDeep } from 'lodash';
import CurrentCalculation from './components/CurrentCalculation';
import TotalCalculation from './components/TotalCalculation';
import Error from './components/Error';
import LogoHeader from './components/LogoHeader';
import StudentInformationFieldset from './components/StudentInfomationFieldset';
import StudentFetchFieldset from './components/StudentFetchFieldset';


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

  fetchUserInformation = async (e) => {
    e.preventDefault();
    this.setState({isFetching: true})
    const { studentID, studentPassword }  = this.state;
    await axios.post('https://ksu-edugate-scraping-wadahesam.c9users.io/getStudentInformation', {id: studentID, password: studentPassword})
    .then((result) => {
      if (result.data === "Somthing Wrong Happened") {
        throw new Error("Somthing Wrong Happened");
      }
      const { gpa, hours, points, subjects } = result.data;
      this.setState({
        gpa,
        hours: parseInt(hours),
        points,
        method: 'points',
        isFetching: false,
        subjects
      });
    })
    .catch((error) => {
      if (error.message === 'Somthing Wrong Happened') {
        this.setState({isFetching: false, isError: true, errorMessage: 'تأكد من بيانات الطالب المدخلة'});
      } else {
        this.setState({isFetching: false, isError: true, errorMessage: 'هنالك خطأ في الاتصال بالخادم'});
      }
      setTimeout(() => {
        this.setState({isError:false});
      }, TIME_TO_HIDE_ERROR)
    })
  }

  render() {
    const githubIcon = <a className="github-icon contact-icons" href="https://github.com/WadhahEssam/ksu-gpa-v2"><img align="middle" height="20" src="img/github.svg" alt="github-icon" /></a> ;
    return (
      <div>

        {/* Header Logo/Error */}
        <div>
          {(this.state.isError) ? <Error errorMessage={this.state.errorMessage} /> : <LogoHeader/>}
        </div>

        <div className="main-container" >

          <StudentFetchFieldset setState={(newState) => {this.setState(newState)}} state={this.state} fetchUserInformation={(e) => {this.fetchUserInformation(e)}} />

          <div className="or-div" style={{display: 'inline'}}>
            <h3 style={{display: 'inline'}}>او</h3>
          </div>

          <StudentInformationFieldset setState={(newState) => {this.setState(newState)}} state={this.state} />

          {/* Table of subjects */}
          <div className="table-div">
            <table align="center" dir="rtl" className="subjects-table">
              <thead>
                  <tr>
                    <th/>
                    <th>اسم المادة</th>
                    <th>الساعات</th>
                    <th>التقدير</th>
                  </tr>
              </thead>
              {this.renderSubjects()}
            </table>
          </div>
          
          {/* Add/Remove Buttons */}
          <div className="buttons-div">
            <button
            className="remove-button"
            onClick={() => {
              let subjects = cloneDeep(this.state.subjects);
              if (subjects.length > 1) {
                subjects.pop();
                this.setState({subjects: subjects});
              }
            }}
            >
              <img height="20" className="remove-button-logo" src="img/minus.png" alt="remove-logo" />
            </button>
            <button
            className="add-button"
            onClick={() => {
              let subjects = cloneDeep(this.state.subjects);
              subjects.push({
                id: subjects.length,
                name: '',
                hours: '2',
                grade: 'A+',
                checked: true,
              })
              this.setState({subjects: subjects});
            }}
            >
              <img height="20" className="add-button-logo" src="img/plus.png" alt="add-logo" />
            </button>
          </div>

          <br/>
          
          {/* Results */}
          <CurrentCalculation state={this.state} />
          <TotalCalculation state={this.state} />
        </div>
        {githubIcon}
      </div>
    );
  }

  renderSubjects() {
    const renderedSubjects = this.state.subjects.map((subject, index) => {
      return(
        <tr key={index}>

          <td className="index">{index+1}</td>
          <td>
            <input 
            disabled={!subject.checked}
            size="3" 
            className="subject-name" 
            value={subject.name} 
            onChange={(e) => {
              let subjects = cloneDeep(this.state.subjects);
              subjects[index].name = e.target.value;
              this.setState({subjects: subjects});
            }} 
            />
          </td>
          <td>
            <select 
            disabled={!subject.checked}
            value={subject.hours} 
            onChange={(e) => {
              let subjects = cloneDeep(this.state.subjects);
              subjects[index].hours = e.target.value;
              this.setState({subjects: subjects});
            }}
            >
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
            </select>
          </td>
          <td>
            <select 
            disabled={!subject.checked}
            defaultValue={subject.grade} 
            onChange={(e) => {
              let subjects = cloneDeep(this.state.subjects);
              subjects[index].grade = e.target.value;
              this.setState({subjects: subjects});
            }}
            >
              <option>A+</option>
              <option>A</option>
              <option>B+</option>
              <option>B</option>
              <option>C+</option>
              <option>C</option>
              <option>D+</option>
              <option>D</option>
            </select>
          </td>
          <td>
            <input 
            className="checkbox" 
            id="eighth-checkbox" 
            type="checkbox" 
            defaultChecked={subject.checked}
            onChange={(e) => {
              let subjects = cloneDeep(this.state.subjects);
              subjects[index].checked = e.target.checked;
              this.setState({subjects: subjects});
            }} />
          </td>
        </tr>
      );
    });
    return(
      <tbody>
        {renderedSubjects}
      </tbody>
    );
  }
}

export default App;
