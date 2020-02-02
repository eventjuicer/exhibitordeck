
import { Alert, Vibration } from 'react-native';
import {Font} from 'expo';
import * as Permissions from 'expo-permissions';
import { all, call, put, take, fork, select, takeEvery, takeLatest, throttle} from 'redux-saga/effects';
import Types from "./types";

import {
  authenticated,
  unauthenticated,
  cameraPermission,
  participantsFetch,
  participantsFetched,
  recentlyScannedCode,
  synced,
  participantUnknown,
  getCompanies,
  setCompanies,
  setCompany
} from "./actions";

import {RecentlyScannedParticipantSelector} from './reselect'

import {config, 
  postJson, 
  getJson, 
  api_restricted, 
  api_services,
  api_public
} from "../services/api";

import NavigationService from '../services/NavigationService'

import {
  getAuth, 
  getParticipants, 
  getScanned, 
  getComments, 
  getOptions, 
  getRuntime 
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
   //   yield call(NavigationService.navigate, "Home", {})
    }else{
      Vibration.vibrate();
      Alert.alert("Bad credentials")
    }
  }
}

function* handleCameraAskPermission(){
  const permData = yield call(Permissions.askAsync, Permissions.CAMERA);
  yield put(cameraPermission(permData.status === 'granted'));
}

function* handleScanned(action){
  
  const {payload} = action;

  yield put(recentlyScannedCode(payload));

  const participants = yield select(getParticipants)

  if(! (payload in participants)){
    yield put(participantUnknown())
    yield put(participantsFetch())
  }

  Vibration.vibrate();
}


/** OLD */





const handleSyncFn = function* handleSync(action)
{
  const url = `${config.api_services}/scanners/${action.payload.auth.code}/sync`;
  const {response, error} = yield call(postJson, url, action.payload);
  if (!error){
   yield put(synced(response.data))
   console.log("handleSync OK", response);
  } else {
   yield put(synced(null))
   console.log("handleSync ERROR", error);
  }
}

const handleAuthenticateFn = function* handleAuthenticate(action)
{

  let url, apiResponse;

  //console.log("test", action.payload)

  //login via email / pass
  if(action.payload === new Object(action.payload) && "email" in action.payload && "password" in action.payload){
    url = `${config.api_restricted}/me/`;
    apiResponse = yield call(postJson, url, action.payload);
    
  }else{
    url = `${config.api_services}/scanners/${action.payload}/auth`;
    apiResponse = yield call(getJson, url);
  }

  console.log(apiResponse)

  const {response, error} = apiResponse;

  if (!error){
   yield put(authenticated(response.data))
   Vibration.vibrate();
   console.log("handleAuthenticate OK", response);
  } else {
   yield put(unauthenticated())
   console.log("handleAuthenticate ERROR", error.toString() );
  }
}

const handleParticipantsFetchFn = function* handleParticipantsFetch()
{
  const url = `${config.api_public}/participants-by-code`;
  const {response, error} = yield call(getJson, url);
  if (!error){
   yield put(participantsFetched(response.data))
   console.log("handleParticipantsFetch OK");
  } else {
   console.log("handleParticipantsFetch ERROR", error);
  }
}


const handleAuthCheckFn = function* handleAuthCheck(auth)
{
  if(!auth)
  {
    yield put(unauthenticated());
  }
}

const handleUnauthenticatedFn = function* handleUnauthenticated()
{
  Alert.alert(
    'Dear Exhibitor, who are you?',
    "Scan the QR code that appears on your exhibitor account",
    [
       {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  );
}



const handleLogoutFn = function* handleLogout()
{
  Alert.alert(
    "Bye :)",
    "Want to sign in again? Scan the QR code that appears on your exhibitor account",
    [
       {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  );
}



const rootSaga = function * root() {
  let sagaIndex = [

        takeEvery(Types.GET_COMPANIES, handleGetCompanies),
        takeEvery(Types.AUTHENTICATE_BY_CREDENTIALS, handleAuthenticateByCredentials),
        takeEvery(Types.ASK_CAMERA_PERMISSION, handleCameraAskPermission),
        takeEvery(Types.PARTICIPANT_SCANNED, handleScanned),
        
        // takeEvery(Types.LOGOUT, handleLogoutFn),
        // takeEvery(Types.PARTICIPANTS_FETCH, handleParticipantsFetchFn),
        // takeEvery(Types.UNAUTHENTICATED, handleUnauthenticatedFn),
        // takeEvery(Types.AUTH_CHECK, handleAuthCheckFn),
        // takeEvery(Types.AUTHENTICATE, handleAuthenticateFn),
        // takeEvery(Types.SYNC_REQUEST, handleSyncFn)
  ];

  yield all(sagaIndex);
};

export default rootSaga;
