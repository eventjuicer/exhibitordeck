
import { Alert, Vibration } from 'react-native';
import {Permissions, Font} from 'expo';
import { call, put, take, fork, takeEvery, takeLatest, throttle} from 'redux-saga/effects';

import Types from "../types";
import {

  authenticated,
  unauthenticated,
  cameraPermission,
  participantsFetched,
  recentlyScannedCode,
  synced
} from "../actions";

import config from "../../services/api";



function checkStatus(response)
{
  if (response.ok){
    return response
  } else {
    var error = new Error(response.statusText)
    error.response = response
    throw error
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


function* handleFetched()
{
    //alert("Participants fetched");
}


function* handleScanned()
{
    Vibration.vibrate();
}

function codeToUserData(code)
{
  console.log("fetching user for code: " + code);

  return  fetch(config.api_services + '/barcode-scanner/auth/'+code)
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson.data;
    })
    .catch((error) => {
    //  console.error(error);
    });
}

function* handleParticipantsFetch()
{
  const participants = yield call(_handleParticipantsFetch);
  yield put(participantsFetched(participants));
}


function _handleParticipantsFetch()
{
  return fetch(config.api_public + '/visitors-by-code')
      .then((response) => response.json())
      .then((responseJson) => {
          return "data" in responseJson ? responseJson.data : responseJson;
      })
      .catch((error) => {
        console.error(error);
  });
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

function* handleAuthenticate(action)
{
  try {
     const user = yield call(codeToUserData, action.payload);
     yield put(authenticated(user));
     Vibration.vibrate();
  } catch (e) {
    yield put(unauthenticated());
  }

}

function _handleCameraAskPermission()
{
  return Permissions.askAsync(Permissions.CAMERA);
}

export function* handleCameraAskPermission()
{
  const permData = yield call(_handleCameraAskPermission);
  yield put(cameraPermission(permData.status === 'granted'));
}

function _handleSync(payload)
{

//check auth?

  const url = `${config.api_services}/barcode-scanner/sync/${payload.auth.code}`;

  console.log(url);

  return fetch(url,
  {
    method: "POST",
    body: JSON.stringify( payload )
  })
  .then(checkStatus)
  .then(function(res)
  {
    try {
      return res.json();
    }
    catch(e)
    {
      const error = new Error("not valid JSON response");
      error.response = res;
      throw error;
    }
  })
  .then(function(res){
      return res.data;
  });
}

function* handleSync(action)
{
  try {
    const syncStatus = yield call(_handleSync, action.payload);
    console.log(syncStatus);
    yield put(synced(syncStatus));
  }
  catch (e)
  {
    console.log("_handleSync error", e);
    yield put(synced(null));
  }
}


function* watchScanner()
{
    yield throttle(1000, Types.PARTICIPANT_SCANNED, handleScanned);
    yield throttle(1000, Types.AUTHENTICATE, handleAuthenticate);

}

export default function* sagas() {
    yield [
        
        takeEvery(Types.LOGOUT, handleLogout),
        takeEvery(Types.PARTICIPANTS_FETCH, handleParticipantsFetch),
        takeEvery(Types.ASK_CAMERA_PERMISSION, handleCameraAskPermission),
      //  takeEvery("Navigation/NAVIGATE", handleNavigation),
        takeEvery(Types.UNAUTHENTICATED, handleUnauthenticated),
        takeEvery(Types.AUTH_CHECK, handleAuthCheck),
        takeEvery(Types.PARTICIPANTS_FETCHED, handleFetched),
        takeEvery(Types.AUTHENTICATE, handleAuthenticate),
        takeEvery(Types.PARTICIPANT_SCANNED, handleScanned),
        takeEvery(Types.SYNC_REQUEST, handleSync)
    ];
}
