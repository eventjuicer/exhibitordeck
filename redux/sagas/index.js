
import { Alert, Vibration } from 'react-native';
import { call, put, take, fork, takeEvery, takeLatest, throttle} from 'redux-saga/effects';

import {PARTICIPANT_SCANNED} from '../actions/scanned';
import {AUTHENTICATE} from '../actions/authenticate';
import {AUTHENTICATED, authenticated} from '../actions/authenticated';
import {PARTICIPANTS_FETCHED} from '../actions/fetchedVisitors';
import {UNAUTHENTICATED} from '../actions/unauthenticated';


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

  return fetch('https://api.eventjuicer.com/services/v1/barcode-scanner/auth/'+code)
    .then((response) => response.json())
    .then((responseJson) => {
        return responseJson.data;
    })
    .catch((error) => {
    //  console.error(error);
    });
}

function* handleAuthenticate(action)
{
  try {
     const user = yield call(codeToUserData, action.payload);
     yield put(authenticated(user));
     Vibration.vibrate();
  } catch (e) {
    // yield put({type: "USER_FETCH_FAILED", message: e.message});
  }

}



function* handleNavigation()
{
  //alert("changed");
}

function* watchScanner()
{
    yield throttle(1000, PARTICIPANT_SCANNED, handleScanned);
    yield throttle(1000, AUTHENTICATE, handleAuthenticate);

}

export default function* sagas() {
    yield [
        takeEvery("Navigation/NAVIGATE", handleNavigation),
        takeEvery(UNAUTHENTICATED, handleUnauthenticated),
        takeEvery(PARTICIPANTS_FETCHED, handleFetched),
        takeEvery(AUTHENTICATE, handleAuthenticate),
        takeEvery(PARTICIPANT_SCANNED, handleScanned),
    ];
}
