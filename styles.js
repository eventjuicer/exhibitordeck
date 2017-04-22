


import React from 'react';
import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  icon: {
    width: 26,
    height: 26,
  },
});

export const CommentsStyles = StyleSheet.create({
  outerContainer: {
    flex: 1,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: 30,
    paddingTop: 20,
//    alignItems: 'stretch'
  },
  textInput: {
    borderRadius: 1,
    borderWidth: 0,
    backgroundColor: '#ffffff',
    height: 100,
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
