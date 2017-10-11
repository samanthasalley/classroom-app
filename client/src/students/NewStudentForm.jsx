import React from 'react';
import TextField from 'material-ui/TextField';
import DatePicker from 'material-ui/DatePicker';
import RaisedButton from 'material-ui/RaisedButton';

const NewStudentForm = (props) => {
  return (
    <form onSubmit={props.validateNewStudent}>
      <TextField
        name="firstName"
        type="text"
        value={props.newStudent.firstName}
        onChange={props.handleNewStudentInputChange}
        hintText="First Name"
      />
      <TextField
        name="lastName"
        type="text"
        value={props.newStudent.lastName}
        onChange={props.handleNewStudentInputChange}
        hintText="Last Name"
      />
      <DatePicker
        name="dob"
        value={props.newStudent.dob}
        onChange={props.handleNewStudentDOBChange}
        locale='en-US'
        hintText="Date of Birth"
        container="inline"
      />
      <TextField
        name="grade"
        type="number"
        value={props.newStudent.grade}
        onChange={props.handleNewStudentInputChange}
        hintText="Grade"
      />
      <RaisedButton type="submit" label="Save New Student" primary={true}/>
    </form>
  );
};

export default NewStudentForm;