import {PARTICIPANT_SCANNED} from '../actions/scanned';

const participantScanned = (state = [], action) => {
  switch (action.type) {
    case PARTICIPANT_SCANNED:

      return [...state, {code: action.code, ts: action.ts}];

    default:
      return state
  }
}

export default participantScanned;
