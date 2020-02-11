
import * as Types from '../redux/types'

const silent = [
  "persist/REHYDRATE",
  "persist/PERSIST"
]

const removeFromStore = [
  "_persist", 
  "participants",
  "scanned",
  "comments"
]

const logger = store => next => action => {

  let result = next(action)  

  if(__DEV__){

    if(silent.indexOf(action.type) === -1){
      console.log("Action: ", action.type);
      let storeContents = Object.assign({}, store.getState());
      removeFromStore.forEach(function(item){
        if(item in storeContents){
          delete storeContents[item]
        }
      })
      Object.keys(storeContents).map(function(name){
        const value = storeContents[name]
        if(Array.isArray(value) && value.length){
          storeContents[name] = value.splice(1)
        }
      })
     console.info("Store", storeContents);
      console.groupEnd();
    }

  }

  
  return result
  
}

export default logger;
