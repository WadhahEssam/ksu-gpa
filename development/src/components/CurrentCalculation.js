import React, { Component } from 'react';
import Utils from '../Utils';

class CurrentCalculation extends Component {


  render() {
    let sumPoints = 0;
    let statement = 'ممتاز مرتفع';
    let gpa = 5.00;
    let sumHours = 0;

    const { subjects } = this.props.state;
    for (let i = 0; i < subjects.length; i++) {
      const subjectGrade = parseFloat(Utils.getGradePoint(subjects[i].grade));
      const subjectHours = parseFloat(subjects[i].hours);
      sumHours += subjectHours;
      sumPoints += (subjectGrade * subjectHours);
    }
    gpa = sumPoints/sumHours;
    statement = Utils.getStatement(gpa);

    return (
      <fieldset style={{display: 'inline'}} dir="rtl">
        <legend>الفصلي</legend>
        <table>
          <tbody>
            <tr>
              <td><p className="title">النقاط</p></td>
              <td><p>{sumPoints.toFixed(2)}</p></td>
            </tr>
            <tr>
              <td><p className="title">المعدل</p></td>
              <td><p>{gpa.toFixed(2)}</p></td>
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

export default CurrentCalculation;