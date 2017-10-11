import React, { Component } from 'react';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class Student extends Component {
  render() {
    const studentColumns = [];
    Object.values(this.props.student).forEach((val, i) => {
      let value = val;
      if(i === 3) {
        value = new Date(value);
        value = value.getMonth()+1 + "/" + value.getDate() + "/" + value.getFullYear();
      }
      studentColumns.push(
        <TableRowColumn
          key={i}
          style={{ textAlign: 'center' }}
        >
          {value}
        </TableRowColumn>
      );
    });
    return (
      <TableRow className="Student">
        {studentColumns}
      </TableRow>
    );
  }
}

export default Student;
