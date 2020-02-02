import React from 'react'
import { connect } from 'react-redux';
import { askCameraPermission} from '../redux'

class CheckPermissions extends React.Component {

    componentDidMount(){
        const {cameraPermission, askCameraPermission} = this.props;
        askCameraPermission()
    }

    render(){
        return null
    }
}

export default connect(state => ({
    runtime: state.runtime
  }), {
    // appState, 
    askCameraPermission, 
 //   cameraShow
})(CheckPermissions);
  