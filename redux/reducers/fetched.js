


import {PARTICIPANTS_FETCHED} from '../actions/scanned';

const participantsFetched = (state = [], action) => {
  switch (action.type) {
    case PARTICIPANTS_FETCHED:

      console.log(action.type);
console.log(action.payload);

      return [
        ...state,
        {
          text: "action.text",
          completed: false
        }
      ]
    default:
      return state
  }
}


export default participantsFetched;
