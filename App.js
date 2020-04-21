/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  TextInput
} from 'react-native';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import MainTabNavigator from './screens/MainTabNavigator';

function LoginScreen({ navigation }) {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text>Login Screen</Text>
		<TextInput keyboardType="email-address" />
		<Button
		  title="Go to Main"
		  onPress={() => navigation.navigate('Main')}
		/>
	  </View>
	);
}

function DetailsScreen(props) {
	return (
	  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
		<Text>Details Screen</Text>
		<Button
		  title="Go to Details... again"
		  onPress={() => props.navigation.push('Details')}
		/>
		<Button title="Go to Home" onPress={() => props.navigation.navigate('Home')} />
		<Button title="Go back" onPress={() => props.navigation.goBack()} />
	  </View>
	);
  }

const Stack = createStackNavigator();

class App extends Component {

	render() {
		return (
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen name="SplashScreen" component={SplashScreen} options={{headerShown: false}} />
					<Stack.Screen name="Login" component={LoginScreen} />
					<Stack.Screen name="Details" component={DetailsScreen} />
					<Stack.Screen name="Main" component={MainTabNavigator} />
				</Stack.Navigator>
		  </NavigationContainer>
		)
	}
};

export default App;
