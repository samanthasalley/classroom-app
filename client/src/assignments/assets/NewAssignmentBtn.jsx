import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const NewAssignmentBtn = (props) => {
  return(
    <RaisedButton
      className="New-Assignment-Btn"
      onClick={props.addNewAssignment}
      label="Add New Assignment" primary={true}
      labelStyle={{'fontSize':'0.8em'}}
      icon={<FontIcon style={{'fontSize':'1em'}} className="fa fa-plus" />}
    />
  );
};

export default NewAssignmentBtn;