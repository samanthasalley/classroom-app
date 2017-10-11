import React from 'react';
import TextField from 'material-ui/TextField';
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import RaisedButton from 'material-ui/RaisedButton';

const NewGradeForm = (props) => {
  let studentFullName = `${props.student.firstname} ${props.student.lastname}`;
  let assignmentOptions = [];
  props.assignments.forEach((assignment, i) => assignmentOptions.push(<MenuItem key={i} value={assignment._id} primaryText={assignment.name} />));
  return (
    <div>
      <header style={{'textAlign':'center'}}>
        <h3>Adding Grade for: {studentFullName}</h3>
      </header>
      <form onSubmit={props.validateNewGrade}>
        <TextField
          name="student"
          type="number"
          value={props.student._id}
          onChange={props.handleNewGradeStudentChange}
          style={{'display':'none'}}
        />
        <SelectField
          floatingLabelText="Select an assignment"
          value={props.newGrade.item}
          onChange={props.handleNewGradeAssignmentChange}>
          {assignmentOptions}
        </SelectField>
        <TextField
          name="actualScore"
          type="number"
          value={props.newGrade.actualScore}
          onChange={props.handleNewGradeInputChange}
          hintText="Grade"
        />
        <RaisedButton type="submit" label="Save New Grade" primary={true}/>
      </form>
    </div>
  );
};

export default NewGradeForm;