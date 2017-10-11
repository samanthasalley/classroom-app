import React from 'react';
import {
  Toolbar, 
  ToolbarGroup,
  ToolbarSeparator, 
  ToolbarTitle
} from 'material-ui/Toolbar';
import NewAssignmentBtn from './assets/NewAssignmentBtn';
import AssignmentTable from './AssignmentTable';
import NewAssignmentForm from './NewAssignmentForm';

const AssignmentContainer = (props) => {
  return (
    <div className="Assignments-Container">
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Assignmentss Toolbar" />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <NewAssignmentBtn addNewAssignment={props.addNewAssignment} />
        </ToolbarGroup>
      </Toolbar>
      {props.showAssignments ? <AssignmentTable assignments={props.assignments} /> : null}
      {props.showAddAssignment ? <NewAssignmentForm 
        newAssignment={props.newAssignment} 
        validateNewAssignment={props.validateNewAssignment}
        handleNewAssignmentInputChange={props.handleNewAssignmentInputChange}
        handleNewAssignmentDueDateChange={props.handleNewAssignmentDueDateChange}
        handleNewAssignmentAssignedDateChange={props.handleNewAssignmentAssignedDateChange}
        /> : null}
    </div>
  );
};

export default AssignmentContainer;
  // {props.showAddAssignment ? <NewStudentForm 
  //   newStudent={props.newStudent} 
  //   validateNewStudent={props.validateNewStudent}
  //   handleNewStudentInputChange={props.handleNewStudentInputChange}
  //   /> : null}