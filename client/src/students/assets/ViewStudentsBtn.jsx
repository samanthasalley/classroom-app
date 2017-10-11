import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const ViewStudentsBtn = (props) => {
  return(
    <RaisedButton
      className="View-Student-Btn"
      onClick={props.getAllStudents}
      label="All Students" default={true}
      labelStyle={{'fontSize':'0.8em'}}
      icon={<FontIcon style={{'fontSize':'1em'}} className="fa fa-eye" />}
    />
  );
};

export default ViewStudentsBtn;