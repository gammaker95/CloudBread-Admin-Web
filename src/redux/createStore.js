import { createStore as _createStore, applyMiddleware, compose } from 'redux';
import { syncHistory } from 'redux-simple-router';
import thunk from 'redux-thunk';
import { canUseDOM } from 'lib/env';

export default function createStore(history, reducers, data) {
  const router = syncHistory(history);
  const middlewares = [
    thunk,
    router,
  ];

  let finalCreateStore;
  if (__DEV__ && canUseDOM) {
    middlewares.concat([
    ]);
    finalCreateStore = compose(
      applyMiddleware(...middlewares, require('redux-logger')()),
    )(_createStore);
  } else {
    finalCreateStore = applyMiddleware(...middlewares)(_createStore);
  }

  const store = finalCreateStore(reducers, data);

  if (__DEV__ && canUseDOM) {
    // Hot reload reducers (requires Webpack or Browserify HMR to be enabled)
    // if (module.hot) {
    //   module.hot.accept('./modules', () =>
    //     store.replaceReducer(require('./modules').default)
    //   );
    // }
  }

  return store;
}