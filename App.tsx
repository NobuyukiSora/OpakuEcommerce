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
import {DatabaseProvider} from './src/services/sqlite/databaseContext';
import {createTables} from './src/services/sqlite/database';

function App(): React.JSX.Element {
  useEffect(() => {
    createTables();
  }, []);
  
  useEffect(() => {
    GoogleSignin.configure({
      webClientId: `${Config.FIREBASE_GOOGLE_KEY}.apps.googleusercontent.com`,
      offlineAccess: true,
    });
  }, [Config]);

  return (
    <DatabaseProvider>
      <Provider store={store}>
        <ThemeProvider>
          <SafeAreaProvider>
            <AppNavigation />
          </SafeAreaProvider>
        </ThemeProvider>
      </Provider>
    </DatabaseProvider>
  );
}

export default App;
