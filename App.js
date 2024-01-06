import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from './screens/context';
import LoginScreen from './screens/LoginScreen';
import DashboardScreen from './screens/DashboardScreen';
import ViewMembersScreen from './screens/ViewMembersScreen';
import ViewWeekScreen from './screens/ViewWeekScreen';
import AddWODScreen from './screens/AddWODScreen';
import ProfileScreen from './screens/ProfileScreen';
import SessionScreen from './screens/SessionScreen';

export default function App() {

  const [currentUser, setCurrentUser] = useState();
  const Stack = createNativeStackNavigator();

  return (

    <UserContext.Provider
      value={{
        currentUser,
        setCurrentUser,
      }}>
      <NavigationContainer>

        <Stack.Navigator
          initialRouteName='Login'
        >
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{
              headerShown: false
            }}
          />
          <Stack.Screen
            name='Dashboard'
            component={DashboardScreen}
            options={{
              headerShown: true,
            }}
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
    </UserContext.Provider>

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
