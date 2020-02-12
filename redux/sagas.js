
import { Alert, Vibration } from 'react-native';
import {
//  Font, 
  Updates
} from 'expo';

import * as Permissions from 'expo-permissions';
import { all, call, put, take, fork, select, takeEvery, takeLatest, throttle} from 'redux-saga/effects';
import Types from "./types";
import {timestamp, isString, keyByCode} from '../helpers'

import {
  authenticated,
  unauthenticated,
  getCompanies,
  cameraPermission,
  participantsFetch,
  participantsFetched,
  recentlyScannedCode,
  syncRequest,
  syncing,
  synced,
  participantUnknown,
  setCompanies,
  setCompany,
  participantScannedNew,
  participantScanError,
  participantsFromSync
} from "./actions";

import {
  RecentlyScannedCodeSelector, 
  LastSyncSelector,
  AuthenticatedRepSelector
} from './reselect'

import {
  config, 
  postJson, 
  getJson, 
  api_restricted, 
  api_services,
  api_public
} from "../services/api";

import NavigationService from '../services/NavigationService'

import { 
  getParticipants, 
  getScanned, 
  getComments, 
} from './selectors';

function* handleGetCompanies(){
  const url = `${api_public}/mobileappusers`
  const {response, error} = yield call(getJson, url)
  if(response && "data" in response){
    yield put(setCompanies(response.data))
  }else{
    //error
  }
}

function* handleAuthenticateByCredentials({payload}){
  const url = `${api_restricted}/authenticate`
  const {response, error} = yield call(postJson, url, payload)
  if(response && "data" in response){
    if("id" in response.data && response.data.id){
      yield put(setCompany(response.data))
    }else{
      Vibration.vibrate();
      Alert.alert("Bad credentials")
    }
  }
}

function* handleRepSelect(){
    yield put(participantsFetch())
    yield call(NavigationService.navigate, "Home", {})
}

function* handleCameraAskPermission(){
  const permData = yield call(Permissions.askAsync, Permissions.CAMERA);
  yield put(cameraPermission(permData.status === 'granted'));
}

function* handleScanned(action){
  
  const {payload} = action;
  const ts = timestamp();

  const last = yield select(RecentlyScannedCodeSelector)
  const scanned = yield select(getScanned)

  if( payload in scanned || payload === last){
    yield put(participantScanError())
  
  }else{

    if(! /^[a-z]+$/.test(payload) ){
      yield put(participantScanError("Is it a visitor?"))
    }

    yield put(participantScannedNew(payload, ts))  
  }
}

function* handleScannedNew(action){

  const {payload, ts} = action;

  yield put(recentlyScannedCode(payload));

  const participants = yield select(getParticipants)

  if(! (payload in participants)){
    yield put(participantUnknown())
  }

  //AUTO SYNC EVERY 15 MINUTES?

  const lastSync = yield select(LastSyncSelector)
  const now = + new Date();

  if((now - lastSync)/1000 > 60 * 15 ){
    yield put(syncRequest());
  }

  Vibration.vibrate();
}

function* handleParticipantUnknown(action){
  //check time from last sync?
  yield put(participantsFetch())

}

function* handleParticipantScanError(action){

  const {payload} = action

  if(isString(payload)){
    Alert.alert(payload)
  }

}

function* handleParticipantsFetch(){
  
  const url = `${config.api_public}/participants-by-code`;
  const {response, error} = yield call(getJson, url);
  if (!error){
   yield put(participantsFetched(keyByCode(response.data)))
   console.log("handleParticipantsFetch OK");
  } else {
   console.log("handleParticipantsFetch ERROR", error);
  }
}



/** OLD */


function* handleSync(action){

  const currentUser = yield select(AuthenticatedRepSelector)
  const comments = yield select(getComments)
  const scanned = yield select(getScanned)
  const sync = + new Date();
  
  if( currentUser && "mobileappcode" in currentUser ){

     yield put(syncing(sync));

     const url = `${api_services}/scanners/${currentUser.mobileappcode}/sync`;
     const {response, error} = yield call(postJson, url, {comments, scanned});

    if (!error){
      yield put(participantsFromSync(response.data))
      console.log("handleSync OK", url, response);
    } else {
      console.log("handleSync ERROR", url, error);
    }

    yield put(synced())

  }

  //yield put(participantsFetch())

  //SELECT CURRENT USERRRRR!!!!

  /**
   *  const {auth, scanned, comments, syncRequest, participantsFetch}   = this.props;
    const lastSync = + new Date();

    ({scanned, comments, auth, lastSync});
    
   */


 
}




// const handleAuthenticateFn = function* handleAuthenticate(action)
// {

//   let url, apiResponse;

//   //console.log("test", action.payload)

//   //login via email / pass
//   if(action.payload === new Object(action.payload) && "email" in action.payload && "password" in action.payload){
//     url = `${config.api_restricted}/me/`;
//     apiResponse = yield call(postJson, url, action.payload);
    
//   }else{
//     url = `${config.api_services}/scanners/${action.payload}/auth`;
//     apiResponse = yield call(getJson, url);
//   }

//   console.log(apiResponse)

//   const {response, error} = apiResponse;

//   if (!error){
//    yield put(authenticated(response.data))
//    Vibration.vibrate();
//    console.log("handleAuthenticate OK", response);
//   } else {
//    yield put(unauthenticated())
//    console.log("handleAuthenticate ERROR", error.toString() );
//   }
// }


// const handleAuthCheckFn = function* handleAuthCheck(auth)
// {
//   if(!auth)
//   {
//     yield put(unauthenticated());
//   }
// }

// const handleUnauthenticatedFn = function* handleUnauthenticated()
// {
//   Alert.alert(
//     'Dear Exhibitor, who are you?',
//     "Scan the QR code that appears on your exhibitor account",
//     [
//        {text: 'OK', onPress: () => console.log('OK Pressed')},
//     ]
//   );
// }

// const handleLogoutFn = function* handleLogout()
// {
//   Alert.alert(
//     "Bye :)",
//     "Want to sign in again? Scan the QR code that appears on your exhibitor account",
//     [
//        {text: 'OK', onPress: () => console.log('OK Pressed')},
//     ]
//   );
// }



const rootSaga = function * root() {
  let sagaIndex = [

        takeEvery(Types.GET_COMPANIES, handleGetCompanies),
        takeEvery(Types.AUTHENTICATE_BY_CREDENTIALS, handleAuthenticateByCredentials),
        takeEvery(Types.ASK_CAMERA_PERMISSION, handleCameraAskPermission),
        takeEvery(Types.PARTICIPANT_SCANNED, handleScanned),
        takeEvery(Types.PARTICIPANT_SCANNED_NEW, handleScannedNew),
        takeEvery(Types.PARTICIPANT_UNKNOWN, handleParticipantUnknown),
        takeEvery(Types.PARTICIPANT_SCAN_ERROR, handleParticipantScanError),
        takeEvery(Types.PARTICIPANTS_FETCH, handleParticipantsFetch),
        takeEvery(Types.SYNC_REQUEST, handleSync),
        takeEvery(Types.SELECT_REP, handleRepSelect)


        // takeEvery(Types.LOGOUT, handleLogoutFn),
        // takeEvery(Types.UNAUTHENTICATED, handleUnauthenticatedFn),
        // takeEvery(Types.AUTH_CHECK, handleAuthCheckFn),
        // takeEvery(Types.AUTHENTICATE, handleAuthenticateFn),
  ];

  yield all(sagaIndex);
};

export default rootSaga;
