import React, { Component } from "react";
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Reminder from './Reminder';
import Settings from './Settings';
import Agenda from './Agenda';
// import Calendar from './Calendar';
import MainBackground from "../components/MainBackground";
  
const Tab = createBottomTabNavigator();

class MainTabNavigator extends Component{
    render(){
        return(
            
                <Tab.Navigator
                screenOptions={({ route }) => ({
                  tabBarIcon: ({ focused, color, size }) => {
                    let iconName;
        
                    if (route.name === 'Reminder') {
                      iconName = 'reminder'
                    } else if (route.name === 'Calendar') {
                      iconName = focused ? 'calendar-month' : 'calendar-month-outline';
                    } else if (route.name === 'Settings') {
                      iconName = focused ? 'settings' : 'settings-outline';
                    } 
        
                    // You can return any component that you like here!
                    return <MaterialCommunityIcons name={iconName} size={size} color={color} />;
                  },
                })}
                tabBarOptions={{
                  activeTintColor: 'tomato',
                  inactiveTintColor: 'gray',
                }}
                >
                    <Tab.Screen name="Reminder" component={Reminder} />
                    <Tab.Screen name="Calendar" component={Agenda} />
                    <Tab.Screen name="Settings" component={Settings} />
                </Tab.Navigator>
            
        )
    }
}

const styles = {
  backgroundColor: '#8dabc7'
}

export default MainTabNavigator;