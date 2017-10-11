import React from 'react';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';

const Grade = (props) => {
  const gradeColumns = [];
  Object.values(props.studentGrade).forEach((val, i) => {
    if(i > 1){
      let value = val;
      gradeColumns.push(
        <TableRowColumn
          key={i}
          style={{ textAlign: 'center' }}
        >
          {value}
        </TableRowColumn>
      );
    }
  });
  return (
    <TableRow className="Grade" id={props.studentGrade._id}>
      {gradeColumns}
    </TableRow>
  );
}

export default Grade;
