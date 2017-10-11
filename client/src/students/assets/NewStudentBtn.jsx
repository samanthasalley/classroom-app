import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const NewAssignmentBtn = (props) => {
  return(
    <RaisedButton
      className="New-Student-Btn"
      onClick={props.addNewStudent}
      label="Add New Student" primary={true}
      icon={<FontIcon className="fa fa-plus" />}
    />
  );
};

export default NewAssignmentBtn;