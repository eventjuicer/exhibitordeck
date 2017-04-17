
import {AUTHENTICATE} from '../actions/authenticate';
import { put, takeEvery } from 'redux-saga/effects';
import { Vibration } from 'react-native';

function* handleAuthenticate()
{
  yield put(Vibration.vibrate());
}

export default function* sagas() {
    yield [
        takeEvery('AUTHENTICATE', handleAuthenticate)
    ];
}
