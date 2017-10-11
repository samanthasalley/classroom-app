import React from 'react';
import StudentToolbar from './StudentToolbar';
import NewStudentForm from './NewStudentForm';
import StudentTable from './StudentTable';

const StudentsContainer = (props) => {
  return (
    <div className="Students-Container">
      <StudentToolbar addNewStudent={props.addNewStudent} />
      {props.showStudents ? <StudentTable students={props.students} /> : null}
      {props.showAddStudent ? <NewStudentForm 
        newStudent={props.newStudent} 
        validateNewStudent={props.validateNewStudent}
        handleNewStudentInputChange={props.handleNewStudentInputChange}
        /> : null}
    </div>
  );
};

export default StudentsContainer;