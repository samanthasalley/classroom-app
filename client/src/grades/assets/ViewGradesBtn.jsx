import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const ViewGradesBtn = (props) => {
  return (
    <RaisedButton
      className="View-Student-Grades-Btn"
      onClick={() => props.getStudentGrades(props.student._id, props.studentIdx)}
      default={true}
      style={{'marginRight':'5px'}}
      icon={<FontIcon style={{'fontSize':'1em'}} className="fa fa-eye" />}
    />
  );
};

export default ViewGradesBtn;