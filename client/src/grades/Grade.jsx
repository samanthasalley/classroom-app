import React from 'react';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import DeleteGradeBtn from './assets/DeleteGradeBtn';

const Grade = (props) => {
  const gradeColumns = [];
  Object.values(props.studentGrade).forEach((val, i) => {
    if (i > 2) {
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
  gradeColumns.push(
    <TableRowColumn
      key={Object.values(props.studentGrade).length}
      style={{ textAlign: 'center' }}
    >
      <DeleteGradeBtn student={props.student} studentGrade={props.studentGrade} deleteGrade={props.deleteGrade} />
    </TableRowColumn>
  );
  return (
    <TableRow className="Grade" id={props.studentGrade._id}>
      {gradeColumns}
    </TableRow>
  );
}

export default Grade;
