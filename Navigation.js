import React from 'react';
import { Text, View, SafeAreaView, ScrollView, Dimensions, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createDrawerNavigator, DrawerItems } from 'react-navigation-drawer';
import { Icon } from 'react-native-elements';

import HomePage from './scenes/HomePage'
import Scanned from './scenes/Scanned'
import Options from './scenes/Options'
import User from './scenes/User'

const CustomDrawerNavigation = (props) => {
    return (
    <SafeAreaView style={{ flex: 1 }}>
    <View style={{ height: 250, backgroundColor: '#d2d2d2', opacity: 0.9 }}>
    <View style={{ height: 200, backgroundColor: 'Green', alignItems: 'center', justifyContent: 'center' }}>
    {/* <Image source={require('./assets/no-image.png')} style={{ height: 150, width: 150, borderRadius: 60 }} /> */}
    </View>
    <View style={{ 
        height: 50, 
        backgroundColor: 'Green', 
        alignItems: 'center', 
        justifyContent: 'center' 
    }}>
    <Text>John Doe</Text>
    </View>
    </View>
    <ScrollView>
    <DrawerItems {...props} />
    </ScrollView>
    <View style={{ alignItems: "center", bottom: 20 }}>
    <View style={{ flexDirection: 'row' }}>
    <View style={{ flexDirection: 'column', marginRight: 15 }}>
    <Icon name="menu" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
    </View>
    <View style={{ flexDirection: 'column' }}>
    <Icon name="menu" style={{ fontSize: 24 }} onPress={() => console.log("Tıkladın")} />
    </View>
    </View>
    </View>
    </SafeAreaView>
    );
}

const Drawer = createDrawerNavigator({
    Home: {
      screen: HomePage,
      navigationOptions: {
        title: 'Home',
        drawerLabel : "Home",
      }
    },
    Scanned: {
      screen: Scanned,
      navigationOptions: {
        drawerLabel : "Scanned",
        title: 'Scanned'
      }
    },
    // Notifications: {
    //   screen: NotificationsPage,
    //   navigationOptions: {
    //     title: 'Notifications'
    //   }
    // },
    SettingsPage: {
      screen: Options,
      navigationOptions: {
        drawerLabel : "Settings",
        title: 'Settings'
      }
    },
    UserPage: {
      screen: User,
      navigationOptions: {
        drawerLabel : "User",
        title: 'User'
      }
    }
  },
    {
      drawerPosition: 'left',
      contentComponent: CustomDrawerNavigation,
      drawerOpenRoute: 'DrawerOpen',
      drawerCloseRoute: 'DrawerClose',
      drawerToggleRoute: 'DrawerToggle',
      //drawerWidth: (width / 3) * 2
    });

export default createAppContainer(Drawer)