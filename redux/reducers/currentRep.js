import Types from '../types';

export default function(state = null, action){

  switch (action.type) {

    case Types.SELECT_REP:
        return Object.assign({}, action.payload);
    break;

    case Types.UNSET_COMPANY:
        return null
    break;

    default:
      return state
  }
}

