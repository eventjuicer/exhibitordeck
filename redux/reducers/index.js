

import {combineReducers } from 'redux';

import scanned from './scan';
import participants from './fetched';
import nav from './nav';
import auth from './auth';
import options from './options';
import comments from './comments';
import runtime from './runtime';

//export default combineReducers({ auth, nav, participants, scanned, comments, options, runtime});
export default { auth, nav, participants, scanned, comments, options, runtime};
