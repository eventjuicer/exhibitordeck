
require('console-polyfill')

import React from 'react';
import { AppLoading } from 'expo';
//import { View, Text } from "react-native";

import Sentry from 'sentry-expo';
Sentry.enableInExpoDevelopment = true;
Sentry.config('https://66b467cc8a61480cbd381f811a5e7ac5@sentry.io/240287').install();


import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'

import defaultSagas from './redux/sagas';
import {configureStore, sagaMiddleware} from './redux'


const { persistor, store } = configureStore()
sagaMiddleware.run(defaultSagas);

import Welcome from './scenes/Welcome';

const onBeforeLift = () => {
  // take some action before the gate lifts
}

class Expojuicer extends React.Component {

  render()
  {
   
     return (
      <Provider store={store}>
      <PersistGate 
        loading={<AppLoading />}
        onBeforeLift={onBeforeLift}
        persistor={persistor}>
          <Welcome />
      </PersistGate>

      {/* <Welcome /> */}
    </Provider>

     )
  }

}


export default Expojuicer