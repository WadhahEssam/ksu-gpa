import React, { Component } from 'react';

class CurrentCalculation extends Component {
  render() {
    return (
      <fieldset style={{display: 'inline'}} dir="rtl">
        <legend>الفصلي</legend>
        <table>
          <tbody>
            <tr>
              <td><p>النقاط</p></td>
              <td><p id="currentPoints" >50.00</p></td>
            </tr>
            <tr>
              <td><p>المعدل</p></td>
              <td><p id="currentGPA">5.00</p></td>
            </tr>
            <tr>
              <td><p>التقدير</p></td>
              <td><p id="currentStatment">ممتاز مرتفع</p></td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    );
  }
}

export default CurrentCalculation;