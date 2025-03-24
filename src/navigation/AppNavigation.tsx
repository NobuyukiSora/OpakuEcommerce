import React, {useEffect} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {createDrawerNavigator} from '@react-navigation/drawer';
import analytics from '@react-native-firebase/analytics';
import HomeScreen from '../screens/HomeScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {StatusBar, View} from 'react-native';
import Navigator from './Navigator';
import DetailProductScreen from '../screens/ProductDetailScreen';
import {useTheme} from 'soras-ui';
import SettingScreen from '../screens/SettingScreen';

const Stack = createNativeStackNavigator();
const Drawer = createDrawerNavigator();

const AppNavigation = () => {
  const {theme} = useTheme();

  useEffect(() => {
    analytics().logAppOpen();
  }, []);

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
      />
      <NavigationContainer ref={Navigator.navigationRef}>
        <Stack.Navigator
          screenOptions={{headerShown: false}}
          initialRouteName="Home">
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="ProductDetail" component={DetailProductScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </View>
  );
};
export default AppNavigation;
