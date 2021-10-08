import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store';
import './configs/firebase';

import AppContainer from './containers/AppContainer';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router>
        <AppContainer />
      </Router>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root'),
);
