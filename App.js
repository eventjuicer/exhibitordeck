require('console-polyfill')

import React, {Component} from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import {AppLoading} from 'expo';

import Sentry from 'sentry-expo';
Sentry.enableInExpoDevelopment = true;
Sentry.config('https://66b467cc8a61480cbd381f811a5e7ac5:a4381e8aaa124de582df061bb7331d06@sentry.io/240287').install();



import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';



//import {persistStore, autoRehydrate} from 'redux-persist';


import { persistStore, persistCombineReducers } from 'redux-persist';
import storage from 'redux-persist/es/storage';
import { PersistGate } from 'redux-persist/es/integration/react'


import logger from './services/logger';


import appReducers from './redux/reducers';
import sagas from './redux/sagas';
import Welcome from './scenes/Welcome';


const sagaMiddleware = createSagaMiddleware();


const configStorage = {
  key: 'root',
  storage,
}


const reducer = persistCombineReducers(configStorage, appReducers);


function configureStore(){

  let store = createStore(reducer, undefined, compose(
      applyMiddleware(sagaMiddleware),
      applyMiddleware(logger)
      )
  );
  let persistor = persistStore(store)
  
  return { persistor, store }
}

const { persistor, store } = configureStore()

sagaMiddleware.run(sagas);

const onBeforeLift = () => {
  // take some action before the gate lifts
}

export default class App extends Component {

  constructor(props)
  {
     super(props)
   //  this.state = { rehydrated: false }
  }

  // waitForStoreRehydration = () => {
  //   persistStore(store, {blacklist : ["nav", "participants", "runtime"], storage: AsyncStorage}, () => {
  //    this.setState({ rehydrated: true });
  //    console.log('REDUX STORE restored');
  //  })
  //  //.purge()
  // }

  componentWillMount()
  {
 //  this.waitForStoreRehydration();
  }

  render()
  {
   
     return (
       <Provider store={store}>

       <PersistGate 
      loading={<AppLoading />}
      onBeforeLift={onBeforeLift}
      persistor={persistor}>
      <Welcome/>
    </PersistGate>
       </Provider>
     )
  }

}


