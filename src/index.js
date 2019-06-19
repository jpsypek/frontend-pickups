import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import { Provider } from "react-redux"
import AppContainer from './js/containers/AppContainer'
import store from "./js/store/index"
import * as serviceWorker from './serviceWorker'

ReactDOM.render(
  <Provider store={store}>
    <AppContainer />
  </Provider>,
  document.getElementById('root'))

serviceWorker.unregister();
