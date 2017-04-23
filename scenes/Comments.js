
import React, {Component} from 'react';
import { connect } from 'react-redux';

import {Alert, StyleSheet, ScrollView, View, Text, Image, KeyboardAvoidingView, TextInput } from 'react-native';
import {Button, Grid, Row, FormLabel, FormInput, Slider} from 'react-native-elements';

import {CommentsStyles as styles} from '../styles';

import {participantComment, purgeCommentsForCode} from '../redux/actions';


class Comments extends Component {


  state = {
    behavior: 'padding',
    height : 0,
    slider : 3,
    text : ""
  }

  _getQuickComments = () => {
    const {options} = this.props;
    if(typeof options.comments === "undefined" || !Array.isArray(options.comments))
    {
      options.comments = [];
    }
    return options.comments.filter(v => v);
  }

  _getCustomComments = () => {

    const allComments = this._getCommentsForCode();
    const quickComments = this._getQuickComments();
    return allComments.filter(v => quickComments.indexOf(v)==-1);
  }

  _getCommentsForCode = () => {

    const {comments} = this.props;
    const {state} = this.props.navigation;
    return (state.params.id in comments) ? comments[state.params.id] : [];

  }

  _renderCustomComments = () => {

    return this._getCustomComments().map(function(comment, index){

      return (<Text key={index} style={{fontSize: 16}}>{comment}</Text>);

    });
  }

  _renderQuickComments = () => {

  const comments = this._getCommentsForCode();
  const {state} = this.props.navigation;
  const {participantComment} = this.props;

  return this._getQuickComments().map(function(comment, index){

      let isSelected = (comments.indexOf(comment) > -1);

      return (
        <Button key={index} fontSize={14}
        icon={{name: 'comment'}}
        buttonStyle={{backgroundColor: isSelected ? '#246fcc' : '#787878', borderRadius: 2, marginBottom: 5}}
        textStyle={{textAlign: 'left'}}
        title={comment}
        onPress={ () => participantComment(state.params.id, comment)}
        />
      )

  });

  }

  _handleCustomComment = (text) => {

    const { state } = this.props.navigation;
    const { participantComment } = this.props;
    participantComment(state.params.id, text);
    this.setState({text : ""});
  }

  render() {

    const { state } = this.props.navigation;
    const { purgeCommentsForCode } = this.props;

    return (

<ScrollView style={styles.outerContainer}>

  <KeyboardAvoidingView behavior={this.state.behavior} style={styles.container}>

  {this._renderQuickComments()}

  <View style={{paddingTop: 10, paddingHorizontal: 20}}>
      {this._renderCustomComments()}
  </View>

<View style={{paddingHorizontal: 15, paddingVertical: 20}}>

  <TextInput
    returnKeyType="send"
    blurOnSubmit={true}
    onSubmitEditing={(event)=> this._handleCustomComment(event.nativeEvent.text)}
    multiline={false}
    placeholder="Your comment..."
    style={styles.textInput}
    value={this.state.text}
    onChangeText={(text) => this.setState({text})}
  />
</View>

<Button buttonStyle={{marginTop: 10, marginBottom: 50}}  backgroundColor="red" borderRadius={2} icon={{name: 'delete'}}
onPress={() => Alert.alert("Are you sure?", null, [{text: "Delete", onPress: ()=> purgeCommentsForCode(state.params.id)}, {text: "Cancel"} ])}
title="Delete comments"
/>

</KeyboardAvoidingView>
</ScrollView>
);
  }
}





const mapStateToProps = state => ({
  auth : state.auth,
  options : state.options,
  comments : state.comments
});

export default connect(mapStateToProps, {
  participantComment, purgeCommentsForCode
})(Comments);
