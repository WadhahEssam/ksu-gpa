import React, { Component } from 'react';
import Utils from '../Utils';

class TotalCalculation extends Component {

  render() {
    let statement = '-';
    let gpa = 5;
    let totalPoints = 0;
    let totalGpa = 0;
    let totalHours = 0;

    const {state} = this.props;
    const method = state.method;
    const oldGpa = parseFloat(state.gpa);
    const oldPoints = parseFloat(state.points);
    const oldHours = parseFloat(state.hours);
    const sumPointsAndHours = Utils.getSumPointsAndHours(this.props.state.subjects);
    let {sumHours, sumPoints} = sumPointsAndHours;

    gpa = sumPoints/sumHours;
    statement = Utils.getStatement(gpa);

    if (method === 'gpa') {
      if (isNaN(oldGpa) || isNaN(oldHours))  {
        sumPoints = 0;
        statement = '-';
        gpa = 0;
      } else {
        totalHours = (oldHours + sumHours);
        totalPoints = (oldGpa * oldHours) + (sumPoints);
        totalGpa = (totalPoints / totalHours);
        statement = Utils.getStatement(totalGpa);
      }
    } 
    else {
      if (isNaN(oldPoints) || isNaN(oldHours))  {
        sumPoints = 0;
        statement = '-';
        gpa = 0;
      } else {
        totalHours = (oldHours + sumHours);
        totalPoints = (oldPoints + sumPoints);
        totalGpa = (totalPoints / totalHours);
        statement = Utils.getStatement(totalGpa);
      }
    }

    return (
      <fieldset style={{display: 'inline'}} dir="rtl">
        <legend>التراكمي</legend>
        <table>
          <tbody>
            <tr>
              <td><p className="title" style={(totalPoints!==0||totalGpa!==0)?{}:{marginLeft: 10}}>النقاط</p></td>
              <td><p>{(totalPoints!==0||totalGpa!==0)?totalPoints.toFixed(2):'-'}</p></td>
            </tr>
            <tr>
              <td><p className="title" style={(totalPoints!==0||totalGpa!==0)?{}:{marginLeft: 10}}>المعدل</p></td>
              <td><p>{(totalPoints!==0||totalGpa!==0)?totalGpa.toFixed(2):'-'}</p></td>
            </tr>
            <tr>
              <td><p className="title" style={(totalPoints!==0||totalGpa!==0)?{}:{marginLeft: 10}}>التقدير</p></td>
              <td><p>{statement}</p></td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    );
  }
}

export default TotalCalculation;