import React from 'react';
import { StyleSheet } from 'react-native';




export const general = StyleSheet.create({

  centering: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },


});





export const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export const ScannedStyles = StyleSheet.create({
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

export const CommentsStyles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    paddingTop : 20,
    paddingBottom : 40
  },
  container: {
    // flex: 1,
    // justifyContent: 'center',
    // paddingVertical: 20,
//    alignItems: 'stretch'
  },
  textInput: {
    borderRadius: 1,
    borderWidth: 0,
    backgroundColor: '#ffffff',
    height: 50,
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginBottom: 10,
    fontSize : 16
  },
  segment: {
    marginBottom: 10,
  },
  closeButton: {
    position: 'absolute',
    top: 30,
    left: 10,
  }
});
