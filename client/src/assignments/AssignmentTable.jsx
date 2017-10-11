import React from 'react';
import {
  Table,
  TableBody,
  TableHeader,
  TableHeaderColumn,
  TableRow
} from 'material-ui/Table';
import Assignment from './Assignment';

const AssignmentTable = (props) => {
  const allAssignments = [];
  const assignmentTableHeaders = [];
  if (props.assignments.length) {
    Object.keys(props.assignments[0]).forEach((key, i) => {
      assignmentTableHeaders.push(
        <TableHeaderColumn key={i} style={{ textAlign: 'center' }}>{key.toUpperCase()}</TableHeaderColumn>
      );
    });
    for (let i = 0; i < props.assignments.length; i++) {
      allAssignments.push(
        <Assignment
          key={i}
          assignment={props.assignments[i]}
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
          {assignmentTableHeaders}
        </TableRow>
      </TableHeader>
      <TableBody>
        {allAssignments}
      </TableBody>
    </Table>
  );
};

export default AssignmentTable;