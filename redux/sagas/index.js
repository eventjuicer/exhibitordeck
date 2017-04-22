
import { Alert, Vibration } from 'react-native';
import {Permissions, Font} from 'expo';
import { call, put, take, fork, takeEvery, takeLatest, throttle} from 'redux-saga/effects';

import Types from "../types";
import {authenticated, unauthenticated, cameraPermission, participantsFetched, recentlyScannedCode} from "../actions";




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

function* handleSync()
{
//  fetch("", { method: 'POST')
}

function* handleScanned()
{
    Vibration.vibrate();
}

function codeToUserData(code)
{
  console.log("fetching user for code: " + code);

  return  fetch('https://api.eventjuicer.com/services/v1/barcode-scanner/auth/'+code)
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
  return fetch('https://api.eventjuicer.com/public/v1/hosts/targiehandlu.pl/visitors-by-code?limit=3')
      .then((response) => response.json())
      .then((responseJson) => {
          return responseJson;
      })
      .catch((error) => {
        console.error(error);
  });
}

function* handleLogout(action)
{
  Alert.alert(
    action.currentStatus ? "Bye :)" : 'You have already logged out...',
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

function* handleNavigation()
{
  //alert("changed");
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
        takeEvery("Navigation/NAVIGATE", handleNavigation),
        takeEvery(Types.UNAUTHENTICATED, handleUnauthenticated),
        takeEvery(Types.AUTH_CHECK, handleAuthCheck),
        takeEvery(Types.PARTICIPANTS_FETCHED, handleFetched),
        takeEvery(Types.AUTHENTICATE, handleAuthenticate),
        takeEvery(Types.PARTICIPANT_SCANNED, handleScanned),
    ];
}
