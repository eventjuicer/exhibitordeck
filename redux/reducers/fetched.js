

import {PARTICIPANTS_FETCHED} from '../actions/scanned';



const participantsFetched = (state = [], action) => {
  switch (action.type) {
    case PARTICIPANTS_FETCHED:

      console.log(action);


      return Object.assing({}, state, action.payload);

      // if("data" in action.payload)
      // {
      //
      //   return action.payload.data;
      // }
      // return state;
    default:
      return state
  }
}

export default participantsFetched;
