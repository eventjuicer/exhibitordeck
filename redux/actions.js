import Types from './types';
import {timestamp} from '../helpers';

export const authenticateByCredentials = (payload) => ({
    type: Types.AUTHENTICATE_BY_CREDENTIALS,
    payload: payload
});

export const getCompanies = () => ({
    type : Types.GET_COMPANIES
})

export const setCompanies = (payload = []) => ({
    type : Types.SET_COMPANIES,
    payload : payload
})

export const setCompany = (payload = {}) => ({
    type : Types.SET_COMPANY,
    payload : payload
})

export const unSetCompany = () => ({
    type : Types.UNSET_COMPANY
})

export const selectRep = ( payload = {} ) => ({
    type : Types.SELECT_REP,
    payload : payload
})

export const cameraPermission = (status) => ({
    type: Types.CAMERA_PERMISSION,
    status : status
});

export const askCameraPermission = () => ({
    type: Types.ASK_CAMERA_PERMISSION
});

export const changeActionLabels = (index, text) => ({
    type: Types.CHANGE_ACTION_LABELS,
    index: index ,
    text : text
});

export const participantScanned = (payload) => ({
    type: Types.PARTICIPANT_SCANNED,
    payload: payload
});

export const participantScannedNew = (payload, ts) => ({
    type: Types.PARTICIPANT_SCANNED_NEW,
    payload: payload,
    ts : ts
});

export const recentlyScannedCode = (payload) => ({
    type: Types.RECENTLY_SCANNED_CODE,
    payload : payload
  });

export const participantUnknown = () => ({
    type : Types.PARTICIPANT_UNKNOWN
})

export const participantScanError = (payload = null) => ({
    type : Types.PARTICIPANT_SCAN_ERROR,
    payload : payload
})

/**
 * OLD
 */


export const purgeCommentsForCode = (code) => ({
  type : Types.PURGE_COMMENTS_FOR_CODE,
  code : code
});

// export const authenticate = code => ({
//     type: Types.AUTHENTICATE,
//     payload: code,
// });

// export const authenticated = userData => ({
//     type: Types.AUTHENTICATED,
//     payload: userData,
// });

// export const unauthenticated = () => ({
//     type: Types.UNAUTHENTICATED
// });

// export const authCheck = currentStatus => ({
//     type: Types.AUTH_CHECK,
//     currentStatus : currentStatus
// });

// export const logout = () => ({
//     type: Types.LOGOUT
// });




// export const cameraShow = () => ({
//   type : Types.CAMERA_MUST_BE_SHOWN
// });

// export const cameraHide = () => ({
//   type : Types.CAMERA_MUST_BE_HIDDEN
// });

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



export const syncRequest = payload => ({
    type: Types.SYNC_REQUEST,
    payload : payload
});

export const synced = payload => ({
    type: Types.SYNCED,
    payload : payload
});

export const changeAppState = payload => ({
    type : Types.APPSTATE,
    payload : payload
})
