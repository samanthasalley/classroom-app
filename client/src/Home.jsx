import React from 'react';
import FlatButton from 'material-ui/FlatButton';
import FontIcon from 'material-ui/FontIcon';

import './Home.css';

const Home = () => {
  return (
    <div className="Home-container">
      <header>
        <h1>Welcome to Class-App!</h1>
        <p>What would you like to do?</p>
        <div>
          <FlatButton
            className="Route-To-Students"
            href="/students"
            primary={true}
            label="Manage Students" 
            icon={<FontIcon className="fa fa-users" />}
          />
          <FlatButton
            className="Route-To-Assignments"
            href="/assignments"
            secondary={true}
            label="Manage Assignments" 
            icon={<FontIcon className="fa fa-book" />}
          />
        </div>
      </header>
    </div>
  );
}

export default Home;