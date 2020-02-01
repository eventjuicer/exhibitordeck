import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import createSagaMiddleware from 'redux-saga';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native'
import logger from '../services/logger';
import appReducers from './reducers';

const persistConfig = {
    key: 'v2',
    storage : AsyncStorage,
    blacklist : ["nav", "participants", "runtime"]
}

const sagaMiddleware = createSagaMiddleware();

const configureStore = () => {

    const persistedReducer = persistReducer(persistConfig, combineReducers(appReducers))

    const store = createStore(persistedReducer, {}, compose(
            applyMiddleware(sagaMiddleware),
            applyMiddleware(logger)
        )
    );

    const persistor = persistStore(store)
  
    return { persistor, store }

}

export {configureStore, sagaMiddleware};