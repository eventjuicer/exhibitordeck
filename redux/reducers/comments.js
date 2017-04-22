import Types from '../types';

const participantCommented = (state = [], action) => {

  switch (action.type) {
    case Types.PARTICIPANT_COMMENT:

      return Object.assign({}, {...state, [action.code] : action.text});

    default:
      return state
  }
}

export default participantCommented;
