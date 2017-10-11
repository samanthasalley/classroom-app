import React, { Component } from 'react';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

class Assignment extends Component {
  render() {
    const assignmentColumns = [];
    Object.values(this.props.assignment).forEach((val, i) => {
      let value = val;
      if(i === 2 || i === 3) {
        value = new Date(value);
        value = value.getMonth()+1 + "/" + value.getDate() + "/" + value.getFullYear();
      }
      assignmentColumns.push(
        <TableRowColumn
          key={i}
          style={{ textAlign: 'center' }}
        >
          {value}
        </TableRowColumn>
      );
    });
    return (
      <TableRow className="Assignment">
        {assignmentColumns}
      </TableRow>
    );
  }
}

export default Assignment;
