
import React, {Component} from 'react';
import { connect } from 'react-redux';

import { StyleSheet, View, Text, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, ButtonGroup, Grid, Row, FormLabel, FormInput, Slider} from 'react-native-elements';

import {CommentsStyles as styles} from '../styles';

import {participantComment as participantCommentAction} from '../redux/actions/comment';

class Comments extends Component {


  state = {
    behavior: 'padding',
    text : "",
    height : 0,
    slider : 3,
    selectedIndex: 2
  }

  updateIndex = (selectedIndex) => {
    this.setState({selectedIndex});
  }

  handleInput = (text) => {
    this.setState({text : text});
  }

  handleSubmit = (event) => {

    const {goBack, state, navigate} = this.props.navigation;
    const {participantComment} = this.props;
    const {text} = this.state;

    alert("ID is " + state.params.id);

    participantComment(state.params.id, text);
  }

  render() {

    const {goBack, state, navigate} = this.props.navigation;

    const buttons = ['Hello', 'World', 'Buttons']
      const { selectedIndex } = this.state



    return (

<View style={styles.outerContainer}>
<KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>



  <ButtonGroup
    onPress={this.updateIndex}
    selectedIndex={selectedIndex}
    buttons={buttons}
    containerStyle={{height: 30}} />



<TextInput multiline={true} onChangeText={(text) => this.handleInput(text)} placeholder="Your comment..." onContentSizeChange={(event) => {
this.setState({height: event.nativeEvent.contentSize.height});
}} style={[styles.textInput, {height: Math.max(35, this.state.height)}]} value={this.state.text} />

<Button raised  icon={{name: 'cached'}} title='Save comment' onPress={() => this.handleSubmit()}/>
</KeyboardAvoidingView>
</View>
);
  }
}



const mapStateToProps = state => ({
});

export default connect(mapStateToProps, {
  participantComment : participantCommentAction
})(Comments);
