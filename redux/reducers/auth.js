import Types from '../types';

const userAuthenticated = (state = [], action) => {
  switch (action.type)
  {
    case Types.AUTHENTICATE:
      return Object.assign({}, state, {code : action.payload});
    case Types.AUTHENTICATED:
      return Object.assign({}, state, action.payload);
    case Types.LOGOUT:
      return {}
    default:
      return state
  }
}

export default userAuthenticated;
