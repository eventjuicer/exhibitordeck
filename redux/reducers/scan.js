


export const PARTICIPANT_SCANNED = "PARTICIPANT_SCANNED";

export const participantScanned = (state = [], action) => {
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
