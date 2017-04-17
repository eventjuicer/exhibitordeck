import {PARTICIPANT_SCANNED} from '../actions/scanned';

const participantScanned = (state = [], action) => {
  switch (action.type) {
    case PARTICIPANT_SCANNED:
      return [
        ...state,
        {
          text: action.text,
          completed: false
        }
      ]
    default:
      return state
  }
}

export default participantScanned;
