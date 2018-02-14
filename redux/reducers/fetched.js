import Types from '../types';

const participantsFetched = (state = [], action) => {
  switch (action.type) {
    case Types.PARTICIPANTS_FETCHED:

      let newData = {};
      action.payload.forEach(function(item){
        newData[[item.code]] = item;
      });
      return newData;
      //return Object.assign({}, state, action.payload);
    default:
      return state
  }
}

export default participantsFetched;
