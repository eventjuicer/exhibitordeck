
import React, {Component} from 'react';
import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, Grid, Row, FormLabel, FormInput} from 'react-native-elements';

import {CommentsStyles as styles} from '../styles';

class Comments extends Component {

  state = {
    behavior: 'padding',
    text : "",
    height : 0
  };

  static navigationOptions = {
      // Nav options can be defined as a function of the navigation prop:
    title: ({ state }) => `${state.params.user}`,

  };

  handleInput = (costam) => {
    console.log(costam);
  }

  handleSubmit = (event) => {

      console.log(event);
  }

  render() {

    const { navigate } = this.props.navigation;

    return (
      <View style={styles.outerContainer}>
          <KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>
            <TextInput
       {...this.props}
       multiline={true}
       onChangeText={(text) => {
         this.setState({text});
       }}
       placeholder="Your comment..."
       onContentSizeChange={(event) => {
         this.setState({height: event.nativeEvent.contentSize.height});
       }}
       style={[styles.textInput, {height: Math.max(35, this.state.height)}]}
       value={this.state.text}
     />


              <Button title='BUTTON' onPress={this.handleSubmit}/>
          </KeyboardAvoidingView>
      </View>
    );
  }
}

export default Comments;
