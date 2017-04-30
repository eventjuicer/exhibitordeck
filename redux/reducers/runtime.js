import Types from '../types';


const handleOptions = (state = {isSyncing: false, appState: true}, action) => {
  switch (action.type) {

    case "Navigation/NAVIGATE":

        return Object.assign({}, state, {cameraVisible : (action.routeName == "Scan")});

    case Types.CAMERA_MUST_BE_SHOWN:

      return Object.assign({}, state, {cameraVisible: true});

    case Types.SYNC_REQUEST:

      return Object.assign({}, state, {isSyncing: true, lastSync : action.payload.lastSync});

    case Types.SYNCED:

      return Object.assign({}, state, {isSyncing: false});

    case Types.CAMERA_PERMISSION:

      return Object.assign({}, state, {cameraPermission : action.status});

    case Types.APPSTATE:

      return Object.assign({}, state, {appState : action.payload});


    default:
      return state
  }
}

export default handleOptions;
