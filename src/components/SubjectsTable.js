import React, { Component } from 'react';
import { cloneDeep } from 'lodash';

class SubjectsTable extends Component {

  render() {
    return (
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
    );
  }

  renderSubjects() {
    const renderedSubjects = this.props.state.subjects.map((subject, index) => {
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
                let subjects = cloneDeep(this.props.state.subjects);
                subjects[index].name = e.target.value;
                this.props.setState({subjects: subjects});
              }} 
            />
          </td>
          <td>
            <select 
              disabled={!subject.checked}
              value={subject.hours} 
              onChange={(e) => {
                let subjects = cloneDeep(this.props.state.subjects);
                subjects[index].hours = e.target.value;
                this.props.setState({subjects: subjects});
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
                let subjects = cloneDeep(this.props.state.subjects);
                subjects[index].grade = e.target.value;
                this.props.setState({subjects: subjects});
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
                let subjects = cloneDeep(this.props.state.subjects);
                subjects[index].checked = e.target.checked;
                this.props.setState({subjects: subjects});
              }} 
            />
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

export default SubjectsTable;