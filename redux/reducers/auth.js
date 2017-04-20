import {AUTHENTICATE} from '../actions/authenticate';
import {AUTHENTICATED} from '../actions/authenticated';
import {LOGOUT} from '../actions/logout';

const userAuthenticated = (state = [], action) => {
  switch (action.type)
  {
    case AUTHENTICATE:
      return Object.assign({}, state, {code : action.payload});
    case AUTHENTICATED:
      return Object.assign({}, state, action.payload);
    case LOGOUT:
      return {}
    default:
      return state
  }
}

export default userAuthenticated;
