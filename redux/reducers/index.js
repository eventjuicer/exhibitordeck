import {combineReducers } from 'redux';

import scanned from './scan';
import participants from './fetched';
import nav from './nav';
import auth from './auth';

export default combineReducers({ auth, nav, participants, scanned});
