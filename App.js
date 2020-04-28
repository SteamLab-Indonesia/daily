import React, {Component} from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import Login from './screens/Login';
import SignUp from './screens/SignUp';
import MainTabNavigator from './screens/MainTabNavigator';
import TimerScreen from './screens/TimerScreen';
import SignUp from './screens/SignUp';

function HomeScreen({ navigation }) {
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Text>Home Screen</Text>
        <Button
          title="Go to Details"
          onPress={() => navigation.navigate('Details')}
        />
      </View>
    );
  }

function DetailsScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to Details... again"
        onPress={() => navigation.navigate('Details')}
      />

    </View>
  );
}

const Stack = createStackNavigator();

class App extends Component {
    render(){
        return(
        <NavigationContainer>
        <Stack.Navigator initialRouteName="Splash">
            <Stack.Screen name="Splash" component={SplashScreen} options={{headerShown: false}}/>
            <Stack.Screen name="Login" component={Login} options={{headerShown: false}} />  
            <Stack.Screen name="SignUp" component={SignUp} options={{headerShown: false}} />  
            <Stack.Screen name="Main" component={MainTabNavigator} options={{headerShown: false}}/>  
            <Stack.Screen name="Timer" component={TimerScreen} options={{headerShown: false}}/>
        </Stack.Navigator>
        </NavigationContainer>
        )
    }
}

const styles ={
    splashscr: {
        backgroundColor: 'lightgreen',
        fontSize: 70,
        fontWeight: 4,
        fontColor: 'darkgreen'
    },

}
export default App;