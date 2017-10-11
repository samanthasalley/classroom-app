import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import Student from './Student';

const StudentTable = (props) => {
  const allStudents = [];
  const studentTableHeaders = [];
  if (props.students.length) {
    Object.keys(props.students[0]).forEach((key, i) => {
      studentTableHeaders.push(
        <TableHeaderColumn key={i} style={{ textAlign: 'center' }}>{key.toUpperCase()}</TableHeaderColumn>
      );
    });
    for (let i = 0; i < props.students.length; i++) {
      allStudents.push(
        <Student
          key={i}
          student={props.students[i]}
        />
      );
    }
  }
  return (
    <Table>
      <TableHeader
        displaySelectAll={false}
        adjustForCheckbox={false}
      >
        <TableRow>
          {studentTableHeaders}
        </TableRow>
      </TableHeader>
      <TableBody>
        {allStudents}
      </TableBody>
    </Table>
  );
};

export default StudentTable;