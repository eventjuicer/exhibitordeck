
require('console-polyfill')

import React from 'react';
import { AppLoading } from 'expo';
//import { View, Text } from "react-native";

// import sentry from './services/sentry'
// sentry();

import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'

import defaultSagas from './redux/sagas';
import {configureStore, sagaMiddleware} from './redux'

const { persistor, store } = configureStore()
sagaMiddleware.run(defaultSagas);

import Start from './scenes/Start';

const onBeforeLift = () => {
  // take some action before the gate lifts
}

const Expojuicer = () => (

  <Provider store={store}>
      <PersistGate 
        loading={<AppLoading />}
        onBeforeLift={onBeforeLift}
        persistor={persistor}>
          <Start />
      </PersistGate>
    </Provider>

)

export default Expojuicer