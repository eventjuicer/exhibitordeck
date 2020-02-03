
import React from 'react'
import * as Font from 'expo-font';

class LoadCustomFonts extends React.Component {

    state = {
        fontLoaded: false,
    };
    
    async componentDidMount() {

        const {fonts} = this.props;

        await Font.loadAsync(fonts);
    
        this.setState({ fontLoaded: true });
    }

      render(){
          
        const { children } = this.props;
        const { fontLoaded } = this.state;

        return children(fontLoaded)
      }
}

LoadCustomFonts.defaultProps = {
  fonts : {
    "Roboto-Bold" : require("../assets/Roboto-Bold.ttf")
  }
}

export default LoadCustomFonts;