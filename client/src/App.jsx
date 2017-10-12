import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import LoggedInMenu from './menus/LoggedInMenu';
import Home from './Home';
import StudentsContainer from './students/StudentsContainer';
import AssignmentContainer from './assignments/AssignmentContainer';
import GradesByAssignment from './GradesByAssignment';

class App extends Component {
  render() {
    return (
      <div className="App">
        <MuiThemeProvider>
          <BrowserRouter>
            <div>
              <AppBar
                title="Class-App"
                titleStyle={{ textAlign: 'center' }}
                iconElementRight={
                  <LoggedInMenu />
                }
                showMenuIconButton={false}
              />
              <Switch>
                <Route exact path="/" component={Home} />
                <Route exact path="/students" component={StudentsContainer} />
                <Route exact path="/assignments" component={AssignmentContainer} />
                <Route exact path="/grades-by-assignment" component={GradesByAssignment} />
              </Switch>
            </div>
          </BrowserRouter>
        </MuiThemeProvider>
      </div>
    );
  }
}

export default App;
