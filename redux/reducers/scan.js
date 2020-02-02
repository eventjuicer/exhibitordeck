import Types from '../types';

const participantScanned = (state = [], action) => {

  switch (action.type) {

    case Types.SYNCED:

      //merge only when not empty!?
      if(action.payload && ("scanned" in action.payload) && Object.keys(action.payload.scanned).length)
      {
        return Object.assign({}, state, action.payload.scanned);
      }

    case Types.PARTICIPANT_SCANNED:

      return {...state, [action.payload] : {ts: action.ts}};

    case Types.PURGE_SCANNED:

      return {};

    default:
      return state
  }
}

export default participantScanned;
