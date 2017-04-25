require('console-polyfill')

import React, {Component} from 'react';
import { AsyncStorage, View, Text } from 'react-native';
import Expo, {AppLoading} from 'expo';
import { createStore, applyMiddleware, compose } from 'redux';
import { Provider } from 'react-redux';
import createSagaMiddleware from 'redux-saga';
import {persistStore, autoRehydrate} from 'redux-persist';

import appReducers from './redux/reducers';
import sagas from './redux/sagas';
import Welcome from './scenes/Welcome';

const logger = store => next => action => {

  console.group("BEGIN:" + action.type)
  if(action.type != "PARTICIPANTS_FETCHED")
  {
    console.log("Payload: ", action);
  }
  let result = next(action)
  let storeContents = Object.assign({}, store.getState());
  if("participants" in storeContents)
  {
    storeContents["participants"] = "@@@ hidden @@@";
  }
  console.log("next state", storeContents);
  console.groupEnd("END: " + action.type)
  return result
}

const sagaMiddleware = createSagaMiddleware();





const store = createStore(appReducers, undefined, compose(
  applyMiddleware(sagaMiddleware),
  autoRehydrate({log: true}),
  applyMiddleware(logger)
  )
);

sagaMiddleware.run(sagas);

class App extends Component {

  constructor(props)
  {
     super(props)
     this.state = { rehydrated: false }
  }

  waitForStoreRehydration = () => {
    persistStore(store, {blacklist : ["nav", "participants", "runtime"], storage: AsyncStorage}, () => {
     this.setState({ rehydrated: true });
     console.log('REDUX STORE restored');
   })
   //.purge()
  }

  componentWillMount()
  {
    this.waitForStoreRehydration();
  }

  render()
  {
    if(!this.state.rehydrated)
    {
       return (<AppLoading />)
     }
     return (
       <Provider store={store}>
        <Welcome/>
       </Provider>
     )
  }

}

Expo.registerRootComponent(App);
export default App;
