import React, { Component } from 'react';
import Utils from '../Utils';

class TotalCalculation extends Component {

  state = {
  }

  componentDidMount() {
  }

  render() {
    let sumPoints = 0;
    let statement = '-';
    let gpa = 5;
    let sumHours = 0;
    let totalPoints = 0;
    let totalGpa = 0;
    let totalHours = 0;

    const { subjects, method } = this.props.state;
    const oldGpa = parseFloat(this.props.state.gpa);
    const oldPoints = parseFloat(this.props.state.points);
    const oldHours = parseFloat(this.props.state.hours);
    console.log(`${method} ${oldGpa} ${oldPoints} ${oldHours}`)

    for (let i = 0; i < subjects.length; i++) {
      const subjectGrade = parseFloat(Utils.getGradePoint(subjects[i].grade));
      const subjectHours = parseFloat(subjects[i].hours);
      sumHours += subjectHours;
      sumPoints += (subjectGrade * subjectHours);
    }
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
              <td><p className="title">النقاط</p></td>
              <td><p>{totalPoints.toFixed(2)}</p></td>
            </tr>
            <tr>
              <td><p className="title">المعدل</p></td>
              <td><p>{totalGpa.toFixed(2)}</p></td>
            </tr>
            <tr>
              <td><p className="title">التقدير</p></td>
              <td><p>{statement}</p></td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    );
  }
}

export default TotalCalculation;