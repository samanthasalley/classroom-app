import React from 'react';
import FontIcon from 'material-ui/FontIcon';
import RaisedButton from 'material-ui/RaisedButton';
import {
  Toolbar, 
  ToolbarGroup,
  ToolbarSeparator, 
  ToolbarTitle
} from 'material-ui/Toolbar';

const StudentToolbar = (props) => {
  return (
    <Toolbar>
      <ToolbarGroup>
        <ToolbarTitle text="Student Toolbar" />
      </ToolbarGroup>
      <ToolbarGroup>
        <ToolbarSeparator />
        <RaisedButton
          onClick={props.addNewStudent}
          label="Add New Student" primary={true}
          icon={<FontIcon className="fa fa-plus" />}
        />
      </ToolbarGroup>
    </Toolbar>
  );
};

export default StudentToolbar;