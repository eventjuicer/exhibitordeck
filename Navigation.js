import React from 'react';
import { StyleSheet, Text, View, SafeAreaView, ScrollView, Dimensions } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { createStackNavigator } from 'react-navigation-stack';

import { Icon, Image } from 'react-native-elements';

import NavCompanyImage from './components/NavCompanyImage'
import HomePage from './scenes/HomePage'
import Scanned from './scenes/Scanned'
import Options from './scenes/Options'
import User from './scenes/User'
import Comments from './scenes/Comments'
import NavButton from './components/NavButton'

const styles = StyleSheet.create({
    
  headerImage : {
      height: 50, 
      backgroundColor: '#d2d2d2', 
      alignItems: 'center', 
      justifyContent: 'center' 
  }

});

const CustomDrawer = (props) => {
    //console.log(props);
    return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
    <NavCompanyImage />
    <View style={styles.headerImage}>
    <Text>John Doe</Text>
    </View>
    </View>
    <ScrollView>
    <DrawerItems {...props} />
    </ScrollView>
    <View style={{ alignItems: "center", bottom: 20 }}>
    {/* <View style={{ flexDirection: 'row' }}>
    <View style={{ flexDirection: 'column', marginRight: 15 }}>
    <Icon name="menu" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
    </View>
    <View style={{ flexDirection: 'column' }}>
    <Icon name="menu" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
    </View>
    </View> */}
    </View>
    </SafeAreaView>
    );
}

const StackNavigation = createStackNavigator({

  People: {
    screen: Scanned,
    navigationOptions : ({navigation}) => ({
       title : "Your last 20 scans",
       headerRight :  <NavButton title="Logout" navigate={navigation.navigate}/>,
       headerShown : false
    })
  },
  Comments: {
    screen: Comments,
    navigationOptions : ({navigation}) => ({
       title : `${navigation.state.params.user}`,
       headerRight :  <NavButton title="Logout" navigate={navigation.navigate}/>
    
    })
  }
},{
  mode : "card",
  headerMode: "screen",
});


const DrawerNavigation = createDrawerNavigator({
    Home: {
      screen: HomePage,
      navigationOptions: {
        title: 'Barcode Scanner',
        drawerLabel : "Barcode Scanner",
      }
    },
    Scanned: {
      screen: StackNavigation,
      navigationOptions: {
        drawerLabel : "Scanned Visitors",
        title: 'Scanned Visitors'
      }
    },
    SettingsPage: {
      screen: Options,
      navigationOptions: {
        drawerLabel : "Templates",
        title: 'Templates'
      }
    },
    UserPage: {
      screen: User,
      navigationOptions: {
        drawerLabel : "Select User",
        title: 'Select User'
      }
    }
  },
    {
      drawerPosition: 'left',
      contentComponent: CustomDrawer,
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      //drawerWidth: (width / 3) * 2
    });

export default createAppContainer(DrawerNavigation)