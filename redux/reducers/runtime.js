import Types from '../types';


const handleOptions = (state = {isSyncing: false}, action) => {
  switch (action.type) {


    case Types.SYNC_REQUEST:

      return Object.assign({}, state, {isSyncing: true});

    case Types.SYNCED:

      return Object.assign({}, state, {isSyncing: false});

    case Types.CAMERA_MUST_BE_SHOWN:

      return Object.assign({}, state, {cameraVisible : true});

    case Types.CAMERA_MUST_BE_HIDDEN:

    return Object.assign({}, state, {cameraVisible : false});

    case Types.CAMERA_PERMISSION:

      return Object.assign({}, state, {cameraPermission : action.status});

    case Types.RECENTLY_SCANNED_CODE:

      return Object.assign({}, state, {lastCode : action.code});

    default:
      return state
  }
}

export default handleOptions;
