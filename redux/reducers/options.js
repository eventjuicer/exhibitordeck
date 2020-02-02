import Types from '../types';

const initialState = {
  lastCode : "",
  scansFromLastSync : 0,
  tsOfLastSync : 0,
  comments : ["vip", "send-offer", "call"]
}

export default function(state = initialState, action){

  switch (action.type) {
  
    case Types.CHANGE_ACTION_LABELS:

    let comments = [];

    if("comments" in state && Array.isArray(state.comments))
    {
        comments = state.comments;
    }

    return Object.assign({}, state, {comments : [...Array(5)].map(function(el, index)
    {
        if(typeof comments[index] !== "undefined")
        {
          el = comments[index];
        }
        if(action.index === index)
        {
          el = action.text;
        }
        return el;
      })
    });

    break;
    case Types.RECENTLY_SCANNED_CODE:
      return Object.assign({}, state, {lastCode : action.payload});
    break;

    default:
      return state
  }
}


