
import React from 'react'
import { StyleSheet, Text, View } from 'react-native';
import {
    ListItem
} from 'react-native-elements';
import {withNavigation} from 'react-navigation'
import {fromNow} from '../helpers'


const styles = StyleSheet.create({
    subtitleView: {
      flexDirection: 'row',
      paddingLeft: 5,
      paddingTop: 5
    },
    subtitleViewText: {
      color: "#787878",
      fontSize: 12
    },
    ratingImage: {
      height: 19.21,
      width: 100
    },
    ratingText: {
      paddingLeft: 10,
      color: 'grey'
    }
});

const ScannedParticipant = ({code, participant, ts, comments, navigation}) => {
    
    const title = `${participant.fname} ${participant.lname}`
    const howOld = fromNow(ts);
    const subtitle = `${participant.cname2} ${howOld}`

    return (
        
            <ListItem
                key={code}
                title={<Text> {title} </Text>}
                subtitle={<View style={styles.subtitleView}>
                          <Text style={styles.subtitleViewText}>
                            { subtitle }
                          </Text>
                        </View>}
               badge={{ value: comments.length, badgeTextStyle: { color: 'white' }, badgeContainerStyle: { backgroundColor: comments.length ? '#2c24cc' : '#787878', marginTop: 5} }}
               onPress = {() => navigation.navigate('Comments', {id: code, user: title})}
              />
            
            
    )
}


export default withNavigation(ScannedParticipant);