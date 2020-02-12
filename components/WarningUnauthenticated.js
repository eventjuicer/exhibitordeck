import React from 'react';
import { Text , View } from 'react-native';
import { connect } from 'react-redux';
import {AuthenticatedRepSelector} from '../redux';
import {withNavigation} from 'react-navigation'
import compose from 'recompose/compose'
import {Button} from 'react-native-elements'

class WarningUnauthenticated extends React.Component {

    render(){

        const {current, navigation} = this.props;

        if(!current){

            return (
                       
                    <Button  
                        color="#000000" 
                        buttonStyle={{margin: 20}}  
                        backgroundColor="#ffffff" 
                        borderRadius={2} 
                        onPress={() => navigation.navigate("UserPage")}
                        title="Log in to save the scans"
                        //disabled={!isValid}
                        type="outline"
                    />         
            )

        }

        return null

    
    }

}

WarningUnauthenticated.defaultProps = {
 
}

const enhance = compose(
    withNavigation,
    connect((state, props) => ({
        current : AuthenticatedRepSelector(state, props)
    }), {})
)

export default enhance(WarningUnauthenticated);
  