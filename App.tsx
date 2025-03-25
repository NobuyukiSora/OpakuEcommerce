/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useEffect} from 'react';

import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Config from 'react-native-config';
import {SafeAreaProvider} from 'react-native-safe-area-context';
import {Provider} from 'react-redux';
import {ThemeProvider} from 'soras-ui';
import AppNavigation from './src/navigation/AppNavigation';
import {store} from './src/services/redux/store';

function App(): React.JSX.Element {
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: `${Config.FIREBASE_GOOGLE_KEY}.apps.googleusercontent.com`,
      offlineAccess: true,
    });
  }, [Config]);

  return (
    <ThemeProvider>
      <Provider store={store}>
        <SafeAreaProvider>
          <AppNavigation />
        </SafeAreaProvider>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
