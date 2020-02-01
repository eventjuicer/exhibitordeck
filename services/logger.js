

const logger = store => next => action => {

  console.group("BEGIN:" + action.type)
  
  // if(action.type != "PARTICIPANTS_FETCHED")
  // {
  //   console.log("Payload: ", action);
  // }
  // let result = next(action)
  // let storeContents = Object.assign({}, store.getState());
  // if("participants" in storeContents)
  // {
  //   storeContents["participants"] = "@@@ hidden @@@";
  // }
  // console.log("next state", storeContents);
  // console.groupEnd("END: " + action.type)
  // return result


  next(action)
  
}

export default logger;
