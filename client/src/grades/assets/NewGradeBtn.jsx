import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const NewGradeBtn = (props) => {
  return(
    <RaisedButton
      className="New-Student-Grade-Btn"
      onClick={() => props.addNewGrade(props.studentIdx)}
      default={true}
      style={{'marginLeft':'5px'}}
      icon={<FontIcon style={{'fontSize':'1em'}} className="fa fa-plus" />}
    />
  );
};

export default NewGradeBtn;