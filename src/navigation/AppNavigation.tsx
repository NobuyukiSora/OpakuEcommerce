import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  DrawerLayoutAndroid,
  StatusBar,
  Switch,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Colors, Metrics, themeColors, Typograph, useTheme} from 'soras-ui';
import IconLogout from '../assets/icons/Ico.Logout.svg';
import {Button} from '../components/Button';
import HomeScreen from '../screens/HomeScreen';
import DetailProductScreen from '../screens/ProductDetailScreen';
import RegisterScreen from '../screens/RegisterScreen';
import Navigator from './Navigator';
import {createStyles} from './styles';

const Stack = createNativeStackNavigator();

const AppNavigation = () => {
  const {theme, toggleTheme} = useTheme();
  const insets = useSafeAreaInsets();
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [token, setToken] = useState<string | null>(null);

  const styles = useMemo(
    () => createStyles(Metrics, insets, themeColors),
    [Metrics, insets],
  );

  useEffect(() => {
    analytics().logAppOpen();
    getToken();
  }, []);

  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem('TOKEN');
    if (!storedToken) {
      Navigator.pureReset('Register');
    } else {
      setToken(storedToken);
    }
  };

  const logout = async () => {
    await AsyncStorage.removeItem('TOKEN');
    drawer?.current?.closeDrawer();
    Navigator.pureReset('Register');
    setToken(null);
  };

  const renderSideView = () => (
    <View style={styles.sideViewContainer}>
      <View>
      </View>
      {!token ? (
        <Button
          title="Register"
          onPress={() => Navigator.navigate('Register')}
        />
      ) : (
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <IconLogout stroke={themeColors.background} width={24} height={24} />
          <Typograph customStyle={{color: themeColors.background}}>
            {'Logout'}
          </Typograph>
        </TouchableOpacity>
      )}
    </View>
  );

  return (
    <View style={{flex: 1}}>
      <StatusBar
        translucent={true}
        backgroundColor="rgba(0, 0, 0, 0)"
        barStyle={theme.isDark ? 'light-content' : 'dark-content'}
      />
      <DrawerLayoutAndroid
        ref={drawer}
        drawerWidth={300}
        drawerPosition="left"
        renderNavigationView={renderSideView}>
        <NavigationContainer ref={Navigator.navigationRef}>
          <Stack.Navigator
            screenOptions={{headerShown: false}}
            initialRouteName="Home">
            <Stack.Screen name="Home" component={() => HomeScreen(drawer)} />
            <Stack.Screen name="Register" component={RegisterScreen} />
            <Stack.Screen
              name="ProductDetail"
              component={DetailProductScreen}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </DrawerLayoutAndroid>
    </View>
  );
};
export default AppNavigation;
