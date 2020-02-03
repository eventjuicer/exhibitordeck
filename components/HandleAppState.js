
import React from 'react'
import { AppState } from 'react-native'
import { connect } from 'react-redux';
import { changeAppState, AppStateSelector } from '../redux'

class HandleAppState extends React.Component {

    componentDidMount() {
        
        changeAppState(AppState.currentState === "inactive")
        
        AppState.addEventListener('change', this._handleAppStateChange);
      }
    
      componentWillUnmount() {

        AppState.removeEventListener('change', this._handleAppStateChange);
      }
    
      _handleAppStateChange = (nextAppState) => {

        const {oldStatus, changeAppState} = this.props;

        const newStatus = (nextAppState === "active")

        if(oldStatus !== newStatus){
            changeAppState(newStatus);
        }
    
      };

      render(){
          return null
      }
}

export default connect(state => ({
    oldStatus : AppStateSelector(state)
}), {changeAppState})(HandleAppState);
  