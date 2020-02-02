import React from 'react';
import { View, Text } from 'react-native'
import {Button, Icon, ListItem} from 'react-native-elements';
import { connect } from 'react-redux';
import get from 'lodash/get'

import {
    unSetCompany, 
    selectRep,
    AuthenticatedCompanySelector,
    AuthenticatedRepSelector
} from '../redux'

class CompanyReps extends React.Component {

    render(){

        const {
            unSetCompany, 
            selectRep, 
            auth, 
            current
        } = this.props;

        return (
            <View style={{flex: 1}}>
            
                <View style={{flex: 3}}>
             
                <Text>sss</Text>  

                {auth.reps.map((rep) => {
                    
                    const {id, profile} = rep;

                    return (
                        <ListItem 
                            key={id} 
                            title={`${get(profile, "fname")} ${get(profile, "lname")}`} 
                            subtitle={`${get(profile, "position", "")}`}
                            bottomDivider
                            checkmark={current ? current.id == id : false}
                            onPress={() => selectRep(rep)}
                    />)
                    }
                 )}
                </View>
                <View style={{flex: 1}}>
                <Button  
                color="#000000" 
                buttonStyle={{margin: 20}}  
                backgroundColor="transparent" 
                borderRadius={2} 
                onPress={unSetCompany}
                title="Sign out"
                //disabled={!isValid}
                type="outline"
                />
                </View>

            </View>
        )
    }
}

export default connect((state, props) => ({
    current : AuthenticatedRepSelector(state, props),
    auth : AuthenticatedCompanySelector(state, props),
}), {unSetCompany, selectRep})(CompanyReps);
