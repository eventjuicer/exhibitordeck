import Types from '../types';

export default function(state = null, action){

  switch (action.type) {

    case Types.SET_COMPANY:
        return Object.assign({}, action.payload);
    break;

    case Types.UNSET_COMPANY:
        return null
    break;

    default:
      return state
  }
}

