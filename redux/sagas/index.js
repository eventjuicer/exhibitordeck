
import { Alert, Vibration } from 'react-native';
import {Permissions, Font} from 'expo';
import { all, call, put, take, fork, select, takeEvery, takeLatest, throttle} from 'redux-saga/effects';

import Types from "../types";

import {
  authenticated,
  unauthenticated,
  cameraPermission,
  participantsFetch,
  participantsFetched,
  recentlyScannedCode,
  synced,
  participantUnknown
} from "../actions";

import {config, postJson, getJson} from "../../services/api";
import {getAuth, getParticipants, getScanned, getComments, getOptions, getRuntime } from './selectors';


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

const handleScannedFn = function* handleScanned(action)
{
    Vibration.vibrate();

    //check if we have this fucker...

    const participants = yield select(getParticipants)

    if(! action.code in participants)
    {
      yield put(participantUnknown())

      yield put(participantsFetch())
    }
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


const handleCameraAskPermissionFn = function* handleCameraAskPermission()
{
  const permData = yield call(Permissions.askAsync, Permissions.CAMERA);
  yield put(cameraPermission(permData.status === 'granted'));
}

//
// function* watchScanner()
// {
//     yield throttle(1000, Types.PARTICIPANT_SCANNED, handleScanned);
//     yield throttle(1000, Types.AUTHENTICATE, handleAuthenticate);
//
// }


const rootSaga = function * root() {
  let sagaIndex = [
    // some sagas only receive an action
        takeEvery(Types.LOGOUT, handleLogoutFn),
        takeEvery(Types.PARTICIPANTS_FETCH, handleParticipantsFetchFn),
        takeEvery(Types.ASK_CAMERA_PERMISSION, handleCameraAskPermissionFn),
        takeEvery(Types.UNAUTHENTICATED, handleUnauthenticatedFn),
        takeEvery(Types.AUTH_CHECK, handleAuthCheckFn),
        takeEvery(Types.AUTHENTICATE, handleAuthenticateFn),
        takeEvery(Types.PARTICIPANT_SCANNED, handleScannedFn),
        takeEvery(Types.SYNC_REQUEST, handleSyncFn)
  ];

  yield all(sagaIndex);
};

export default rootSaga;
