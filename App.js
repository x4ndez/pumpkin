import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking } from 'react-native';
import { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ViewMembersScreen from './screens/ViewMembersScreen';
import ViewWeekScreen from './screens/ViewWeekScreen';
import AddWODScreen from './screens/AddWODScreen';
import ProfileScreen from './screens/ProfileScreen';
import SessionScreen from './screens/SessionScreen';

export default function App() {

  const Stack = createNativeStackNavigator();

  return (

    <NavigationContainer>

      <Stack.Navigator>
        <Stack.Screen
          name='Login'
          component={LoginScreen}
        />
        <Stack.Screen
          name='Dashboard'
          component={DashboardScreen}
        />
        <Stack.Screen
          name='View Members'
          component={ViewMembersScreen}
        />
        <Stack.Screen
          name='View Week'
          component={ViewWeekScreen}
        />
        <Stack.Screen
          name='Add WOD'
          component={AddWODScreen}
        />
        <Stack.Screen
          name='Profile'
          component={ProfileScreen}
        />
        <Stack.Screen
          name='Session'
          component={SessionScreen}
        />
      </Stack.Navigator>

    </NavigationContainer>

  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
