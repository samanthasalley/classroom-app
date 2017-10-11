import React from 'react';
import {
  Toolbar, 
  ToolbarGroup,
  ToolbarSeparator, 
  ToolbarTitle
} from 'material-ui/Toolbar';
import NewStudentBtn from './assets/NewStudentBtn';
import StudentTable from './StudentTable';
import NewStudentForm from './NewStudentForm';

const StudentsContainer = (props) => {
  return (
    <div className="Students-Container">
      <Toolbar>
        <ToolbarGroup>
          <ToolbarTitle text="Student Toolbar" />
        </ToolbarGroup>
        <ToolbarGroup>
          <ToolbarSeparator />
          <NewStudentBtn addNewStudent={props.addNewStudent} />
        </ToolbarGroup>
      </Toolbar>
      {/* <StudentToolbar addNewStudent={props.addNewStudent} /> */}
      {props.showStudents ? <StudentTable students={props.students} /> : null}
      {props.showAddStudent ? <NewStudentForm
        newStudent={props.newStudent}
        validateNewStudent={props.validateNewStudent}
        handleNewStudentDOBChange={props.handleNewStudentDOBChange}
        handleNewStudentInputChange={props.handleNewStudentInputChange}
      /> : null}
    </div>
  );
};

export default StudentsContainer;