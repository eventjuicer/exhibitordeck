
import React, {Component} from 'react';
import { connect } from 'react-redux';

import { StyleSheet, ScrollView, Text, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, Grid, Row, FormLabel, FormInput, Slider} from 'react-native-elements';

import {CommentsStyles as styles} from '../styles';

import {participantComment} from '../redux/actions';

import _ from 'lodash';

//http://stackoverflow.com/questions/30726830/how-to-filter-keys-of-an-object-with-lodash

class Comments extends Component {


  state = {
    behavior: 'padding',
    height : 0,
    slider : 3,
    text : ""
  }


  render() {

    const { goBack, state, navigate} = this.props.navigation;
    const { options, participantComment } = this.props;
    const { text} = this.state;


    return (

<ScrollView style={styles.outerContainer}>
<KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>


  {[1,2,3,4].map(function(index){

  return (

  <Button key={index} fontSize={14}
    icon={{name: 'comment'}}
    buttonStyle={{backgroundColor: 'blue', borderRadius: 5, marginBottom: 10}}
    textStyle={{textAlign: 'left'}}
    title={`hello!`}
    onPress={ () => participantComment(state.params.id, "test")}
  />
  )

  })}

<TextInput
  returnKeyType="send"
  blurOnSubmit={true}
  onSubmitEditing={(event)=> participantComment(state.params.id, event.nativeEvent.text)}
  multiline={false}
  placeholder="Your comment..."
  onContentSizeChange={(event) => {
      this.setState({height: event.nativeEvent.contentSize.height});
  }}
  style={[styles.textInput, {height: Math.max(50, this.state.height)}]}
  value={this.state.text}
  onChangeText={(text) => this.setState({text})}
/>


</KeyboardAvoidingView>
</ScrollView>
);
  }
}





const mapStateToProps = state => ({
  auth : state.auth,
  options : state.options
});

export default connect(mapStateToProps, {
  participantComment
})(Comments);
