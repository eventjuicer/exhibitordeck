import Types from '../types';


const handleOptions = (state = [], action) => {
  switch (action.type) {
    case Types.CHANGE_ACTION_LABELS:

      return Object.assign({}, state, {["a"+action.index] : action.text});

    case Types.CAMERA_PERMISSION:

      return Object.assign({}, state, {camera : action.status});

    case Types.RECENTLY_SCANNED_CODE:

      return Object.assign({}, state, {lastCode : action.code});

    default:
      return state
  }
}

export default handleOptions;
