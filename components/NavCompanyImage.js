

import React from 'react';
import {View} from 'react-native';
import { Image } from 'react-native-elements';
import { connect } from 'react-redux';

import {
    AuthenticatedCompanySelector
  } from '../redux';

import {getImage} from '../helpers'

class NavCompanyImage extends React.Component {

    render(){

        const {company} = this.props;
        const image = getImage(company);

        return (

            <View style={{ height: 200, backgroundColor: '#ffffff', alignItems: 'center', justifyContent: 'center' }}>
            <Image 
                source={{uri:image}}  
                resizeMode="contain" 
                style={{ height: 150, width: 150 }} 
            />
            </View>

        )
    }

}

export default connect((state, props) => ({
    company : AuthenticatedCompanySelector(state, props)
  }), {})(NavCompanyImage);
  