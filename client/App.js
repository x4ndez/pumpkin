import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { UserContext } from './screens/context';
import ProfileButton from './screens/components/ProfileButton';
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
          screenOptions={{
            headerTitle: 'Pumpkin',
            headerShadowVisible: false,
            headerStyle: styles.header,
          }}
        >
          <Stack.Screen
            name='Login'
            component={LoginScreen}
            options={{
              headerShown: false,
            }}
          />
          <Stack.Screen
            name='Dashboard'
            component={DashboardScreen}
            options={{
              headerShown: true,
              headerBackVisible: false,
              
              headerRight: () => (
                <ProfileButton />),
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
  header: {
    // NOTE: Will only accept backgroundColor
    backgroundColor: '#424242',
  }
});
