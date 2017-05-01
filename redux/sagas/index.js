
import { Alert, Vibration } from 'react-native';
import {Permissions, Font} from 'expo';
import { call, put, take, fork, select, takeEvery, takeLatest, throttle} from 'redux-saga/effects';

import Types from "../types";

import {
  authenticated,
  unauthenticated,
  cameraPermission,
  participantsFetched,
  recentlyScannedCode,
  synced
} from "../actions";

import {config, postJson, getJson} from "../../services/api";
import {getAuth, getScanned, getComments, getOptions, getRuntime } from './selectors';


function* handleSync(action)
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

function* handleAuthenticate(action)
{
  const url = `${config.api_services}/scanners/${action.payload}/auth`;
  const {response, error} = yield call(getJson, url);
  if (!error){
   yield put(authenticated(response.data))
   Vibration.vibrate();
   console.log("handleAuthenticate OK", response);
  } else {
   yield put(unauthenticated())
   console.log("handleAuthenticate ERROR", error);
  }
}

function* handleParticipantsFetch()
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


function* handleAuthCheck(auth)
{
  if(!auth)
  {
    yield put(unauthenticated());
  }
}

function* handleUnauthenticated()
{
  Alert.alert(
    'Dear Exhibitor, who are you?',
    "Scan the QR code that appears on your exhibitor account",
    [
       {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  );
}

function* handleScanned()
{
    Vibration.vibrate();
}

function* handleLogout()
{
  Alert.alert(
    "Bye :)",
    "Want to sign in again? Scan the QR code that appears on your exhibitor account",
    [
       {text: 'OK', onPress: () => console.log('OK Pressed')},
    ]
  );
}


function* handleCameraAskPermission()
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


export default function* sagas() {
    yield [
        takeEvery(Types.LOGOUT, handleLogout),
        takeEvery(Types.PARTICIPANTS_FETCH, handleParticipantsFetch),
        takeEvery(Types.ASK_CAMERA_PERMISSION, handleCameraAskPermission),
        takeEvery(Types.UNAUTHENTICATED, handleUnauthenticated),
        takeEvery(Types.AUTH_CHECK, handleAuthCheck),
        takeEvery(Types.AUTHENTICATE, handleAuthenticate),
        takeEvery(Types.PARTICIPANT_SCANNED, handleScanned),
        takeEvery(Types.SYNC_REQUEST, handleSync)
    ];
}
