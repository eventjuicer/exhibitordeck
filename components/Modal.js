import React, { Component } from 'react';
import { Modal as DefaultModal, Text, TouchableHighlight, View } from 'react-native';




class Modal extends Component {

  state = {
    modalVisible: false,
  }

  setModalVisible(visible)
  {
    this.setState({modalVisible: visible});
  }

  render() {
    return (
      <View style={{marginTop: 50, marginHorizontal : 20}}>
        <DefaultModal
          animationType={"slide"}
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => { this.setModalVisible(!this.state.modalVisible) }}
          >

         <View style={{marginTop: 22}}>
          <View>
            <Text>Hello World!</Text>

            <TouchableHighlight onPress={() => {
              this.setModalVisible(!this.state.modalVisible)
            }}>
              <Text>Hide Modal</Text>

            </TouchableHighlight>

          </View>
         </View>
        </DefaultModal>

        <TouchableHighlight onPress={() => {
          this.setModalVisible(true)
        }}>
          <Text>Show Modal</Text>
        </TouchableHighlight>

      </View>
    );
  }
}

export default Modal;
