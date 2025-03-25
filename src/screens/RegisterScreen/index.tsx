import AsyncStorage from '@react-native-async-storage/async-storage';
import analytics from '@react-native-firebase/analytics';
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import React, {useEffect, useMemo} from 'react';
import {Alert, Image, TouchableOpacity, View} from 'react-native';
import {useSafeAreaInsets} from 'react-native-safe-area-context';
import {Metrics, themeColors, Typograph} from 'soras-ui';
import Navigator from '../../navigation/Navigator';
import {createStyles} from './styles';
import i18n from '../../services/languageManagement/i18n';

const RegisterScreen = () => {
  const insets = useSafeAreaInsets();
  const styles = useMemo(
    () => createStyles(Metrics, insets, themeColors),
    [themeColors],
  );

  useEffect(()=>{
    analytics().logScreenView({screen_name: 'RegisterScreen'});
  }, [])

  const registerUser = async () => {
    await analytics().logEvent('user_registered', {
      method: 'google',
    });
    console.log('regis')
    signInWithGoogle();
  };

  const signInWithGoogle = async () => {
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      const idToken = userInfo?.data?.idToken;
      console.log('idToken', idToken)

      if (!idToken) {
        throw new Error('Google Sign-In failed: No idToken received');
      }

      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      await AsyncStorage.setItem('TOKEN', idToken);
      await auth().signInWithCredential(googleCredential);
      console.log('Home')

      Navigator.pureReset('Home');
    } catch (error) {
      console.error('Google Sign-In Error:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image
          source={require('../../assets/images/Art.Logo.png')}
          height={200}
          width={Metrics.screenWidth * 0.9}
          style={{width: Metrics.screenWidth * 0.9, resizeMode: 'contain'}}
        />
      </View>
      <View>
        <TouchableOpacity
          onPress={() => registerUser()}
          style={styles.buttonLogin}>
          <Image
            source={require('../../assets/images/Art.Google.png')}
            height={20}
            width={20}
          />
          <Typograph customStyle={{fontWeight: '800', fontSize: Metrics[16]}}>
            {i18n.t('registerScreen.login_google')}
          </Typograph>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default RegisterScreen;
