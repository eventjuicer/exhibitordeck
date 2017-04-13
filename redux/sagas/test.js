import { put, takeEvery } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { showNotification } from 'admin-on-rest';

function* commentApproveSuccess() {
    yield put(showNotification('Comment approved'));
   // yield put(push('/comments'));
}

function* commentApproveFailure({ error }) {
    yield put(showNotification('Error: comment not approved', 'warning'));
    console.error(error);
}

export default function* commentSaga() {
    yield [
        takeEvery('PURCHASE_STATUS_CHANGE_SUCCESS', commentApproveSuccess),
        takeEvery('PURCHASE_STATUS_CHANGE_FAILURE', commentApproveFailure),
    ];
}
