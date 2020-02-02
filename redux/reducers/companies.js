import Types from '../types';

export default function(state = [], action){

  switch (action.type) {

    case Types.SET_COMPANIES:
        return Array.isArray(action.payload) ? action.payload : []
    break;

    default:
      return state
  }
}

