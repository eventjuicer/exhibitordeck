import Types from './types';

export const changeActionLabels = (index, text) => ({
    type: Types.CHANGE_ACTION_LABELS,
    index: index ,
    text : text
});

export const purgeCommentsForCode = (code) => ({
  type : Types.PURGE_COMMENTS_FOR_CODE,
  code : code
});

export const authenticate = code => ({
    type: Types.AUTHENTICATE,
    payload: code,
});

export const authenticated = userData => ({
    type: Types.AUTHENTICATED,
    payload: userData,
});

export const unauthenticated = () => ({
    type: Types.UNAUTHENTICATED
});

export const authCheck = currentStatus => ({
    type: Types.AUTH_CHECK,
    currentStatus : currentStatus
});

export const recentlyScannedCode = code => ({
  type: Types.RECENTLY_SCANNED_CODE,
  code : code
});

export const logout = () => ({
    type: Types.LOGOUT
});

export const cameraPermission = (status) => ({
    type: Types.CAMERA_PERMISSION,
    status : status
});

export const askCameraPermission = () => ({
    type: Types.ASK_CAMERA_PERMISSION
});

export const participantComment = (code, text) => ({
    type: Types.PARTICIPANT_COMMENT,
    code: code,
    text: text
});

export const participantsFetch = (since = 0) => ({
    type: Types.PARTICIPANTS_FETCH,
    since : since
});

export const participantsFetched = data => ({
    type: Types.PARTICIPANTS_FETCHED,
    payload: data,
});

export const purgeScanned = () => ({
  type : Types.PURGE_SCANNED
});

export const participantScanned = (code, ts) => ({
    type: Types.PARTICIPANT_SCANNED,
    code: code,
    ts : ts
});

export const syncRequest = () => ({
    type: Types.SYNC_REQUEST
});
