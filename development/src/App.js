import React, { Component } from 'react';
import _ from 'lodash';
import SelectField from './components/SelectField';
import CurrentCalculation from './components/CurrentCalculation';

class App extends Component {

  state = {
    subjects: [],
    hours: '',
    gpa: '',
    points: '',
    method: 'gpa',
  }

  componentWillMount() {
    // adding the default empty subjects
    let subjects = [];
    for (let i = 0; i < 5; i++) {
      subjects.push({
        name: '',
        hours: '2',
        grade: 'A+'
      })
    }
    this.setState({subjects});
  }

  componentDidUpdate() {
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="App">
          <img align="middle" id="logo" src="img/logo.png" alt="ksu-logo" />
        </div>
    
        <div className="main-container" >
          {/* Hours/Gpa/Points manula input */}
          <fieldset style={{ display: 'inline'}} className="student-info" dir="rtl" >
            <legend>الساعات / المعدل التراكمي</legend>
            <table>
              <tbody>
                <tr>
                  <td/>
                  <td><p style={{ position: 'relative', bottom: '4px', left: '15px'}}>عدد الساعات السابقة</p></td>
                  <td><input id="hours-text" style={{ marginBottom: '10px' }} size="3" type="number" min="1" max="200" /></td>
                </tr>
                <tr>
                  <td><input checked={this.state.method==="gpa"} value="gpa" className="radio-button" type="radio" name="gpa-type" onChange={() => {this.setState({method: 'gpa'})}} /></td>
                  <td><p>المعدل التراكمي</p></td>
                  <td><input disabled={this.state.method!=="gpa"} id="gpa-text" type="number" min="1" max="5" /></td>
                </tr>
                <tr>
                  <td><input checked={this.state.method==="points"} value="points" className="radio-button" type="radio" name="gpa-type" onChange={() => {this.setState({method: 'points'})}} /></td>
                  <td><p>النقاط التراكمية</p></td>
                  <td><input disabled={this.state.method!=="points"} id="points-text" type="number" min="1" max="200" /></td>
                </tr>
              </tbody>
            </table>
          </fieldset>

          {/* Table of subjects */}
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
          
          {/* Results */}
          <CurrentCalculation state={this.state} />

        </div>
      </div>
    );
  }

  renderSubjects() {
    const renderedSubjects = this.state.subjects.map((input, index) => {
      return(
        <tr key={index}>
          <td>{index+1}</td>
          <td>
            <input 
            size="3" 
            className="subject-name" 
            value={this.state.subjects[index].name} 
            onChange={(e) => {
              let subjects = _.cloneDeep(this.state.subjects);
              subjects[index].name = e.target.value;
              this.setState({subjects: subjects});
            }} 
            />
          </td>
          <td>
            <select 
            defaultValue={this.state.subjects[index].hours} 
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
              defaultValue={this.state.subjects[index].grade} 
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
