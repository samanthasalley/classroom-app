import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const NewAssignmentBtn = (props) => {
  return(
    <RaisedButton
      className="New-Student-Btn"
      onClick={props.addNewStudent}
      label="Add New Student" primary={true}
      labelStyle={{'fontSize':'0.8em'}}
      icon={<FontIcon style={{'fontSize':'1em'}} className="fa fa-plus" />}
    />
  );
};

export default NewAssignmentBtn;