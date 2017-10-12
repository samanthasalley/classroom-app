import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const DeleteGradeBtn = (props) => {
  return(
    <RaisedButton
      className="Delete-Student-Grade-Btn"
      onClick={() => props.deleteGrade(props.student._id, props.studentGrade.grade_id)}
      default={true}
      style={{'marginLeft':'5px'}}
      icon={<FontIcon style={{'fontSize':'1em'}} className="fa fa-trash" />}
    />
  );
};

export default DeleteGradeBtn;