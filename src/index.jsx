import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import {Provider} from 'react-redux';
import App from './components/App';
import store from './redux/store/store';
import 'normalize.css';

ReactDOM.render(
  <Provider store={store}>
    <Router> 
      <Route path='/' component={App} />
    </Router>
  </Provider>,
  document.getElementById('app')
);