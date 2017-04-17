import {combineReducers } from 'redux';


import scan from './scan';
import fetched from './fetched';
import navReducer from './nav';

export default combineReducers({
    nav : navReducer,
    participants : fetched,
    scanned : scan
});
