/**
 * @format
 */
import 'react-native-gesture-handler';
// Add this line to your `index.js`
import 'react-native-get-random-values';
import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';
import {LogBox} from 'react-native';

AppRegistry.registerComponent(appName, () => App);

LogBox.ignoreLogs(['Require cycle:']);
