import React, { Component } from 'react';
import _ from 'lodash';
import CurrentCalculation from './components/CurrentCalculation';
import TotalCalculation from './components/TotalCalculation';

const NUMBER_OF_DEFAULT_SUBJECTS = 6;

class App extends Component {
  state = {
    subjects: [],
    hours: '',
    gpa: '',
    points: '',
    method: 'gpa',
    studentID: '',
    studentPassword: '',
  }

  componentWillMount() {
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
        })
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
    return (
      <div>
        <div className="App">
          <img fill="#4089A9" align="middle" id="logo" src="img/logo.svg" alt="ksu-logo" />
        </div>
    
        <div className="main-container" >

          {/* student credinteals fieldset  */}
          <fieldset style={{ display: 'inline', maxWidth: '80px', padding: '6px 5px',}} className="student-info" dir="rtl" >
            <legend>تعبئة تلقئاية</legend>
            <table>
              <tbody>
                <tr>
                  <td><input className="student-cred-input" type="number" placeholder="الرقم الجامعي" /></td>
                </tr>
                <tr>
                  <td><input className="student-cred-input" type="password" placeholder="كلمة المرور" /></td>
                </tr>
                <tr>
                  <td><button className="fetch-information-button" >تعبئة تلقائية</button></td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          <div className="or-div" style={{display: 'inline'}}>
            <h3 style={{display: 'inline'}}>او</h3>
          </div>

          {/* Hours/Gpa/Points manual fieldset */}
          <fieldset style={{ display: 'inline', padding: '6px 5px'}} className="student-info" dir="rtl" >
            <legend>معلومات الطالب</legend>
            <table>
              <tbody>
                <tr>
                  <td/>
                  <td className="student-information-label-table-data"><p className=" old-hours-label" style={{ position: 'relative', bottom: '5px', left: '9px'}}>الساعات السابقة</p></td>
                  <td><input className="student-information-input" value={this.state.hours} onChange={(e) => {this.setState({hours: e.target.value})}} id="hours-text" style={{ marginBottom: '10px' }} size="3" type="number" min="1" max="200" /></td>
                </tr>
                <tr>
                  <td><input checked={this.state.method==="gpa"} value="gpa" className="radio-button" type="radio" name="gpa-type" onChange={() => {this.setState({method: 'gpa'})}} /></td>
                  <td className="student-information-label-table-data"><p>المعدل</p></td>
                  <td><input className="student-information-input" value={this.state.gpa} onChange={(e) => {this.setState({gpa: e.target.value})}}  disabled={this.state.method!=="gpa"} id="gpa-text" type="number" min="1" max="200" /></td>
                </tr>
                <tr>
                  <td><input checked={this.state.method==="points"} value="points" className="radio-button" type="radio" name="gpa-type" onChange={() => {this.setState({method: 'points'})}} /></td>
                  <td className="student-information-label-table-data"><p>النقاط</p></td>
                  <td><input className="student-information-input" value={this.state.points} onChange={(e) => {this.setState({points: e.target.value})}} disabled={this.state.method!=="points"} id="points-text" type="number" step="any" min="1" max="5000" /></td>
                </tr>
              </tbody>
            </table>
          </fieldset>

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
              let subjects = _.cloneDeep(this.state.subjects);
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
              let subjects = _.cloneDeep(this.state.subjects);
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
              let subjects = _.cloneDeep(this.state.subjects);
              subjects[index].name = e.target.value;
              this.setState({subjects: subjects});
            }} 
            />
          </td>
          <td>
            <select 
            disabled={!subject.checked}
            defaultValue={subject.hours} 
            onChange={(e) => {
              let subjects = _.cloneDeep(this.state.subjects);
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
              let subjects = _.cloneDeep(this.state.subjects);
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
              let subjects = _.cloneDeep(this.state.subjects);
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
