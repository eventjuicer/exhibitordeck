import Types from '../types';

const initialState = {
  isSyncing: false, 
  appState: true
}

export default function (state = initialState, action){
  
  switch (action.type) {

    case Types.CAMERA_MUST_BE_SHOWN:
      return Object.assign({}, state, {cameraVisible: true});
    break;

    case Types.SYNCING:
      return Object.assign({}, state, {isSyncing: true, lastSync : action.payload});
    break;


    case Types.SYNCED:
      return Object.assign({}, state, {isSyncing: false});
    break;

    case Types.CAMERA_PERMISSION:
      return Object.assign({}, state, {cameraPermission : action.status});
    break;

    case Types.APPSTATE:
      return Object.assign({}, state, {appState : action.payload});
    break;

    default:
      return state
  }
}
