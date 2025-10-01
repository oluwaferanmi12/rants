import {AppNavigator} from '@config/navigator/appNavigator';
import {auth, useFirebase, User} from '@library';
import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {SafeAreaView, StatusBar, StyleSheet} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import SplashScreen from 'react-native-splash-screen';
import {Alert} from './src/components';
import {ThemeProvider, useTheme} from './src/data';
import {AppProvider} from './src/data/appContext';
function App(): JSX.Element {
  return (
    <GestureHandlerRootView style={styles.rootView}>
      <ThemeProvider>
        <AppProvider>
          <Bootstrap />
        </AppProvider>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}

function Bootstrap() {
  const {Colors} = useTheme();
  const backgroundStyle = {
    backgroundColor: Colors.NEUTRAL_100,
    flex: 1,
  };

  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User>();
  const {getMyDetails} = useFirebase();

  // Handle user state changes
  function onAuthStateChanged(_user: any) {
    setUser(_user);
    if (initializing) {
      setInitializing(false);
    }
  }

  useEffect(() => {
    const subscriber = auth.onAuthStateChanged(onAuthStateChanged);
    getMyDetails();
    return subscriber; // unsubscribe on unmount
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user !== undefined) {
      setTimeout(() => {
        SplashScreen.hide();
      }, 2000);
    }
  }, [user]);

  return (
    <SafeAreaView style={backgroundStyle}>
      <StatusBar
        barStyle={
          String(Colors.TEXT_ICON_PRIMARY) === '#151515'
            ? 'dark-content'
            : 'light-content'
        }
        backgroundColor={backgroundStyle.backgroundColor}
      />
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
      <Alert />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  rootView: {flex: 1},
});

export default App;
