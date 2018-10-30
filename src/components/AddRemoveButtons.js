import React, { Component } from 'react';
import { cloneDeep } from 'lodash';

class AddRemoveButtons extends Component {

  render() {
    return (
      <div className="buttons-div">
        {/* Remove Button */}
        <button
          className="remove-button"
          onClick={() => {
            let subjects = cloneDeep(this.props.state.subjects);
            if (subjects.length > 1) {
              subjects.pop();
              this.props.setState({subjects: subjects});
            }
          }}
        >
          <img height="20" className="remove-button-logo" src="img/minus.png" alt="remove-logo" />
        </button>

        {/* Add Button */}
        <button
          className="add-button"
          onClick={() => {
            let subjects = cloneDeep(this.props.state.subjects);
            subjects.push({
              id: subjects.length,
              name: '',
              hours: '2',
              grade: 'A+',
              checked: true,
            })
            this.props.setState({subjects: subjects});
          }}
        >
          <img height="20" className="add-button-logo" src="img/plus.png" alt="add-logo" />
        </button>
      </div>
    );
  }
}

export default AddRemoveButtons;