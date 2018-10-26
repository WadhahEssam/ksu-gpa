import React, { Component } from 'react';

class TotalCalculation extends Component {
  render() {
    return (
      <fieldset style={{display: 'inline'}} dir="rtl">
        <legend>التراكمي</legend>
        <table>
          <tbody>
            <tr>
              <td><p>النقاط</p></td>
              <td><p id="totalPoints">50.00</p></td>
            </tr>
            <tr>
              <td><p>المعدل</p></td>
              <td><p id="totalGPA">5.00</p></td>
            </tr>
            <tr>
              <td><p>التقدير</p></td>
              <td><p id="totalStatememt">ممتاز مرتفع</p></td>
            </tr>
          </tbody>
        </table>
      </fieldset>
    );
  }
}

export default TotalCalculation;