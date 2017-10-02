import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import { is } from 'immutable';
import { AppContainer } from 'react-hot-loader';
import { Provider } from 'react-redux';
import { browserHistory } from 'react-router';
import { syncHistoryWithStore } from 'react-router-redux';

import createStore from './redux/create';
import ApiClient from './helpers/ApiClient';
import baseRoute from './routes';
import Root from './root';

import './base.scss';


const client = new ApiClient();

const dest = document.getElementById('app');
window.wrAppContainer = dest;

// eslint-disable-next-line no-underscore-dangle
const store = createStore(browserHistory, client, window.__data);

const createSelectLocationState = () => {
  let prevRoutingState;
  let prevRoutingStateJS;

  return (state) => {
    const routingState = state.get('routing');

    if (!is(prevRoutingState, routingState)) {
      prevRoutingState = routingState;
      prevRoutingStateJS = routingState.toJS();
    }

    return prevRoutingStateJS;
  };
};

const history = syncHistoryWithStore(browserHistory, store, {
  selectLocationState: createSelectLocationState()
});

const renderApp = (renderProps, includeDevTools = false) => {
  let DevTools;

  if(includeDevTools)
    DevTools = require('./containers/DevTools/DevTools');

  ReactDOM.render(
    <AppContainer>
      <Provider store={store} key="provider">
        {
          includeDevTools ?
            <div>
              <Root {...{ store, history, ...renderProps }} />
              <DevTools />
            </div> :
            <Root {...{ store, history, ...renderProps }} />
        }
      </Provider>
    </AppContainer>,
    dest
  );
};

// render once without devtools to confirm client and server renders match
renderApp({ routes: baseRoute(store), client });

if (process.env.NODE_ENV !== 'production') {
  window.React = React; // enable debugger

  if (!dest || !dest.firstChild || !dest.firstChild.attributes || !dest.firstChild.attributes['data-react-checksum']) {
    console.error('Server-side React render was discarded. Make sure that your initial render does not contain any client-side code.');
  }
}

// if devtools enabled, rerender app
// eslint-disable-next-line
if (__DEVTOOLS__ && !window.__REDUX_DEVTOOLS_EXTENSION__) {
  renderApp({ routes: baseRoute(store), client }, true);
}

if (module.hot) {
  module.hot.accept('./routes', () => {
    const nextRoutes = require('./routes');

    renderApp({ routes: nextRoutes(store), client }, true);
  });
}
