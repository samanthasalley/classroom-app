import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import 'normalize.css';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

render(
  <BrowserRouter>
      <Switch>
        <MuiThemeProvider>
          <Route exact path="/" component={App} />
        </MuiThemeProvider>
      </Switch>
    </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();