import Types from '../types';

const participantCommented = (state = [], action) => {


  switch (action.type) {

    case Types.PARTICIPANT_COMMENT:

      if(action.code in state)
      {

        if(Array.isArray(state[action.code]) && state[action.code].indexOf(action.text) > -1)
        {
            /* TOGGLE :) */
            //return Object.assign({}, {...state, [action.code] : state[action.code].splice(state[action.code].indexOf(action.text), 1)});
            return state;
        }
        else
        {
            return Object.assign({}, {...state, [action.code] : [...state[action.code], action.text]});
        }
      }
      else
      {
          return Object.assign({}, {...state, [action.code] : [action.text]});

      }

    case Types.PURGE_COMMENTS_FOR_CODE:

    return Object.assign({}, {...state, [action.code] : []});

    default:
      return state
  }
}

export default participantCommented;
