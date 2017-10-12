import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import Grade from './Grade';

const StudentGradeTable = (props) => {
  let studentFullName = `${props.student.firstname} ${props.student.lastname}`
  const allStudentGrades = [];
  const studentGradeTableHeaders = [];
  if (props.studentGrades.length) {
    Object.keys(props.studentGrades[0]).forEach((key, i) => {
      if (i > 2) {
        studentGradeTableHeaders.push(
          <TableHeaderColumn key={i} style={{ textAlign: 'center' }}>{key.toUpperCase()}</TableHeaderColumn>
        );
      }
    });
    studentGradeTableHeaders.push(
      <TableHeaderColumn key={Object.keys(props.studentGrades[0]).length} style={{ textAlign: 'center' }}>{'OPTIONS'}</TableHeaderColumn>
    );
    for (let i = 0; i < props.studentGrades.length; i++) {
      allStudentGrades.push(
        <Grade
          key={i}
          student={props.student}
          deleteGrade={props.deleteGrade}
          studentGrade={props.studentGrades[i]}
        />
      );
    }
  }
  return (
    <div>
      <header>
        <h3 style={{ 'textAlign': 'center' }}>Showing Grades for: {studentFullName}</h3>
      </header>
      <Table>
        <TableHeader
          displaySelectAll={false}
          adjustForCheckbox={false}
        >
          <TableRow>
            {studentGradeTableHeaders}
          </TableRow>
        </TableHeader>
        <TableBody>
          {allStudentGrades}
        </TableBody>
      </Table>
    </div>
  );
};

export default StudentGradeTable;