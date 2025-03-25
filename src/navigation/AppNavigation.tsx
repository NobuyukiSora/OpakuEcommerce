import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {useEffect, useMemo, useRef, useState} from 'react';
import {
  DrawerLayoutAndroid,
  Image,
  StatusBar,
  TouchableOpacity,
  View,
} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {
  DynamicScrollView,
  Metrics,
  themeColors,
  Typograph,
  useTheme,
} from 'soras-ui';
import IconLogout from '../assets/icons/Ico.Logout.svg';
import {Button} from '../components/Button';
import HomeScreen from '../screens/HomeScreen';
import DetailProductScreen from '../screens/ProductDetailScreen';
import RegisterScreen from '../screens/RegisterScreen';
import {switchLanguage} from '../services/languageManagement/command';
import i18n from '../services/languageManagement/i18n';
import Navigator from './Navigator';
import {createStyles} from './styles';

const Stack = createNativeStackNavigator();

const Language = [
  {
    title: 'Indonesian',
    image: require('../assets/images/Art.Indonesia.png'),
    languageCode: 'id',
  },
  {
    title: 'Vietnam',
    image: require('../assets/images/Art.Vietnam.png'),
    languageCode: 'vi',
  },
  {
    title: 'English',
    image: require('../assets/images/Art.English.png'),
    languageCode: 'en',
  },
];

const AppNavigation = () => {
  const {theme} = useTheme();
  const insets = useSafeAreaInsets();
  const drawer = useRef<DrawerLayoutAndroid>(null);
  const [token, setToken] = useState<string | null>(null);
  const [currentLang, setCurrentLang] = useState(i18n.language);

  const styles = useMemo(
    () => createStyles(Metrics, insets, themeColors),
    [Metrics, insets],
  );

  useEffect(() => {
    analytics().logAppOpen();
    getToken();
    setLanguage();
  }, []);

  useEffect(() => {
    const handleLanguageChange = () => {
      setCurrentLang(i18n.language);
    };

    i18n.on('languageChanged', handleLanguageChange);
    return () => {
      i18n.off('languageChanged', handleLanguageChange);
    };
  }, [currentLang]);

  const setLanguage = async () => {
    const usedLanguage = await AsyncStorage.getItem('LANGUAGE');
    switchLanguage(usedLanguage ?? 'en');
  };

  const getToken = async () => {
    const storedToken = await AsyncStorage.getItem('TOKEN');
    if (!storedToken) {
      Navigator.pureReset('Register');
    } else {
      setToken(storedToken);
    }
  };

  const logout = async () => {
    await analytics().logEvent('user_logout');
    await AsyncStorage.removeItem('TOKEN');
    drawer?.current?.closeDrawer();
    Navigator.pureReset('Register');
    setToken(null);
  };

  const handleSwitchLanguage = async(languageCode: string) => {
    await analytics().logEvent('change_language', {
      language_code: languageCode,
    });
    switchLanguage(languageCode);
      AsyncStorage.setItem('LANGUAGE', languageCode);
  }

  const renderLanguageList = () => {
    const views = [];
    for (let loop = 0; loop < Language?.length; loop++) {
      views.push(
        <TouchableOpacity
          key={loop}
          style={[
            styles.languageList,
            {
              backgroundColor:
                currentLang == Language[loop].languageCode
                  ? themeColors.active
                  : themeColors.backgroundSecondary,
            },
          ]}
          onPress={() => handleSwitchLanguage(Language[loop].languageCode)}>
          <Typograph customStyle={{textAlign: 'center'}}>
            {Language[loop].title}
          </Typograph>
          <Image
            source={Language[loop].image}
            width={Metrics.screenWidth / 5}
            style={{objectFit: 'contain', width: '100%'}}
          />
        </TouchableOpacity>,
      );
    }
    return views;
  };

  const renderSideView = () => (
    <View style={styles.sideViewContainer}>
      <DynamicScrollView direction="row">
        {renderLanguageList()}
      </DynamicScrollView>
      {!token ? (
        <Button
          title={i18n.t('drawer.register')}
          onPress={() => {Navigator.navigate('Register'); drawer?.current?.closeDrawer()}}
        />
      ) : (
        <TouchableOpacity onPress={logout} style={styles.logoutButton}>
          <IconLogout stroke={themeColors.background} width={24} height={24} />
          <Typograph customStyle={{color: themeColors.background}}>
            {i18n.t('drawer.logout')}
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
