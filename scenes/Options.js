import React from 'react';
import { connect } from 'react-redux';

import {
  Platform, 
  ScrollView, 
  View,
  StyleSheet
} from 'react-native';

import {
  Text, 
  Input
} from 'react-native-elements';

import {
  changeActionLabels,
  CommentTemplatesSelector
} from '../redux';

import Header from '../components/MyHeader'

const styles = StyleSheet.create({
  container : {
    backgroundColor: "#ffffff", 
    paddingHorizontal: 20
  },
  title : {
    paddingVertical: 20, 
    paddingHorizontal: 10
  },
  element : {
  
  },

  input : {   
    height: 40, 
    marginTop: 5,  
    borderWidth: Platform.OS == "ios" ? 1 : 0, 
    borderColor: "#cccccc", 
    backgroundColor: "#ffffff", 
    paddingVertical: 10, 
    paddingHorizontal: 20, 
    fontSize: 20, 
    color: "#000000"
  }
})

class Options extends React.Component {

render () {

    const {     
      templates, 
      changeActionLabels
    } = this.props;     
    
    return (

      <View>
      <Header  />
      <ScrollView style={styles.container}>
      <View style={styles.title}>
        <Text h4 >Options</Text>
      </View>

      {/* <View style={styles.preview}>
        {templates.filter(item => item).map((item, i) => <Badge containerStyle={styles.badgeContainerStyle} textStyle={styles.badgeTextStyle} badgeStyle={styles.badgeStyle} key={`${i}-${item}`} value={item} /> )}
      </View> */}

      <View style={{marginTop: 15}}>
        {templates.map((el, index) => (
          <View style={styles.element} key={index}>
          <Input
            returnKeyType="send"
            style={styles.input}
            defaultValue={el}
            maxLength={20}
            onChangeText={(el) => changeActionLabels(index, el)}
          />
          </View>
        ))}
      </View>
      </ScrollView>
      </View>
    )
}

}

export default connect((state, props) => ({
  templates : CommentTemplatesSelector(state, props),
}), {changeActionLabels})(Options);
