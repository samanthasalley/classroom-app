import React from 'react';
import { Link } from 'react-router-dom';
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MenuItem from 'material-ui/MenuItem';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';

const LoggedInMenu = (props) => {
  return(
    <IconMenu
      iconButtonElement={
        <IconButton
          iconStyle={{color: 'white'}}>
          <MoreVertIcon />
        </IconButton>
      }
      targetOrigin={{horizontal: 'right', vertical: 'top'}}
      anchorOrigin={{horizontal: 'right', vertical: 'top'}}
    >
    <MenuItem 
      containerElement={<Link to="/students" />}
      primaryText="Students"
    />
    <MenuItem 
      containerElement={<Link to="/assignments" />}
      primaryText="Assignments"
    />
    </IconMenu>
  );
};

export default LoggedInMenu;