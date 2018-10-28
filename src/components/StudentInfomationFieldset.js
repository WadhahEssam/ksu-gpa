import React, { Component } from 'react';

class StudentInformationFieldset extends Component {

  render() {
    return (
      <fieldset style={{display: 'inline', padding: '6px 5px'}} className="student-info" dir="rtl" >
        <legend>معلومات الطالب</legend>
        <table>
          <tbody>
            <tr>
              <td/>
              <td className="student-information-label-table-data">
                <p className="old-hours-label" style={{position: 'relative', bottom: '5px', left: '9px'}}>الساعات السابقة</p>
              </td>
              <td>
                <input 
                  className="student-information-input" 
                  value={this.props.state.hours} onChange={(e) => {this.props.setState({hours: e.target.value})}} 
                  id="hours-text" 
                  style={{ marginBottom: '10px' }} 
                  size="3" 
                  type="number" 
                  min="1" 
                  max="200" 
                />
              </td>
            </tr>
            <tr>
              <td>
                <input 
                  checked={this.props.state.method==="gpa"} 
                  value="gpa" 
                  className="radio-button" 
                  type="radio" 
                  name="gpa-type" 
                  onChange={() => {this.props.setState({method: 'gpa'})}} 
                />
              </td>
              <td className="student-information-label-table-data">
                <p className="method-label" onClick={(e) => {this.props.setState({method: 'gpa'})}}>المعدل</p>
              </td>
              <td>
                <input 
                  className="student-information-input" 
                  value={this.props.state.gpa} 
                  onChange={(e) => {this.props.setState({gpa: e.target.value})}}  
                  disabled={this.props.state.method!=="gpa"} 
                  id="gpa-text" 
                  type="number" 
                  min="1" 
                  max="200" 
                />
              </td>
            </tr>
            <tr>
              <td>
                <input 
                  checked={this.props.state.method==="points"} 
                  value="points" 
                  className="radio-button" 
                  type="radio" 
                  name="gpa-type" 
                  onChange={() => {this.props.setState({method: 'points'})}} 
                />
              </td>
              <td className="student-information-label-table-data">
                <p className="method-label" onClick={(e) => {this.props.setState({method: 'points'})}}>النقاط</p>
              </td>
              <td>
                <input 
                  className="student-information-input" 
                  value={this.props.state.points} 
                  onChange={(e) => {this.props.setState({points: e.target.value})}} 
                  disabled={this.props.state.method!=="points"} 
                  id="points-text" 
                  type="number" 
                  step="any" 
                  min="1" 
                  max="5000" 
                />
              </td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    );
  }
}

export default StudentInformationFieldset;