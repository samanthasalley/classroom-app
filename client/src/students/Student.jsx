import React from 'react';
import {
  TableRow,
  TableRowColumn
} from 'material-ui/Table';
import ViewGradesBtn from '../grades/assets/ViewGradesBtn';
import NewGradeBtn from '../grades/assets/NewGradeBtn';

const Student = (props) => {
  const studentColumns = [];
  Object.values(props.student).forEach((val, i) => {
    let value = val;
    if (i === 3) {
      value = new Date(value);
      value = value.getMonth() + 1 + "/" + value.getDate() + "/" + value.getFullYear();
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
  studentColumns.push(
    <TableRowColumn
      key={Object.values(props.student).length}
      style={{ textAlign: 'center' }}
    >
      {/* <div style={{'textAlign':'center'}}> */}
      <ViewGradesBtn student={props.student} studentIdx={props.studentIdx} getStudentGrades={props.getStudentGrades} />
      <NewGradeBtn student={props.student} studentIdx={props.studentIdx} addNewGrade={props.addNewGrade} />
      {/* </div> */}
    </TableRowColumn>
  );
  return (
    <TableRow className="Student" id={props.student._id}>
      {studentColumns}
    </TableRow>
  );
}

export default Student;
