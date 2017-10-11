import React from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import FontIcon from 'material-ui/FontIcon';

const ViewAssignmentsBtn = (props) => {
  return(
    <RaisedButton
      className="View-Assignments-Btn"
      onClick={props.getAllAssignments}
      label="All Assignments" default={true}
      labelStyle={{'fontSize':'0.8em'}}
      icon={<FontIcon style={{'fontSize':'1em'}} className="fa fa-eye" />}
    />
  );
};

export default ViewAssignmentsBtn;