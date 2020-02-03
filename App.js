
require('console-polyfill')

import React from 'react';
import {View} from 'react-native';
import { AppLoading } from 'expo';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react'
//custom
import Sentry from './services/sentry'
import defaultSagas from './redux/sagas';
import {configureStore, sagaMiddleware} from './redux'
import Navigation from './Navigation';
import NavigationService from './services/NavigationService';
import CheckPermissions from './components/CheckPermissions'
import HandleAppState from './components/HandleAppState'
import LoadCustomFonts from './components/LoadCustomFonts'

Sentry();
const { persistor, store } = configureStore()
sagaMiddleware.run(defaultSagas);

const App = () => (

  <Provider store={store}>
      <PersistGate 
        loading={<AppLoading />}
        persistor={persistor}
        >
          <View style={{flex: 1}}>
          <HandleAppState/>
          <CheckPermissions />
          <LoadCustomFonts>{
            (loaded) =>  loaded ? <Navigation ref={navigatorRef => NavigationService.setTopLevelNavigator(navigatorRef) } /> : <AppLoading />
          }</LoadCustomFonts>
          </View>
      </PersistGate>
    </Provider>

)

export default App