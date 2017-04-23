import Types from '../types';

const participantScanned = (state = [], action) => {

  switch (action.type) {
    case Types.PARTICIPANT_SCANNED:

      return [{code: action.code, ts: action.ts}, ...state];

    case Types.PURGE_SCANNED:

      return [];

    default:
      return state
  }
}

export default participantScanned;
