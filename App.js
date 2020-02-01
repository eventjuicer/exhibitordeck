
require('console-polyfill')

import React from 'react';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
//custom
import Sentry from './services/sentry'
import defaultSagas from './redux/sagas';
import {configureStore, sagaMiddleware} from './redux'
import Navigation from './Navigation';

Sentry();
const { persistor, store } = configureStore()
sagaMiddleware.run(defaultSagas);

const App = () => (

  <Provider store={store}>
      <PersistGate 
        loading={<AppLoading />}
        persistor={persistor}>
          <Navigation />
      </PersistGate>
    </Provider>

)

export default App