import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const ViewStudentsBtn = (props) => {
  return(
    <RaisedButton
      className="View-Student-Btn"
      onClick={props.getAllStudents}
      label="View Students" default={true}
      icon={<FontIcon className="fa fa-eye" />}
    />
  );
};

export default ViewStudentsBtn;