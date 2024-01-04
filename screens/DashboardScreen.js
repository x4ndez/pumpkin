import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, FlatList, ScrollView } from 'react-native';
import { useState, useEffect } from 'react';
import AddMemberBtn from './components/AddMemberBtn';
import ViewMembersBtn from './components/ViewMembersBtn';
import AddClassBtn from './components/AddClassBtn';
import AddWODBtn from './components/AddWODBtn';

// x Add Member
// Add WOD 
// Add Class

// x View Members
// View Calendar
// View Week

export default function DashboardScreen({ navigation }) {

  const adminTools = [
    <AddMemberBtn />,
    <ViewMembersBtn navigation={navigation} />,
    <AddClassBtn />,
    <AddWODBtn navigation={navigation} />,
    <Button
      title='View Week'
      onPress={() => {
        navigation.navigate('View Week');
      }}
    />,
  ]

  return (

    <View style={styles.container}>

      <Text>Dashboard</Text>

      <ScrollView
        horizontal
        style={[styles.adminTools]}
      >

        <AddMemberBtn />
        <ViewMembersBtn navigation={navigation} />
        <AddClassBtn />
        <AddWODBtn navigation={navigation} />


      </ScrollView>

      <Button
        title='View Week'
        onPress={() => {
          navigation.navigate('View Week');
        }}
      />

      {/* <View>
        <AddMemberBtn />
        <ViewMembersBtn navigation={navigation} />
        <AddClassBtn />
        <AddWODBtn navigation={navigation} />
        <Button
          title='View Week'
          onPress={() => {
            navigation.navigate('View Week');
          }}
        />
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {

  },
  textInput: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
    width: '40%',
  },
  adminTools: {
    width: '100%',
    height: 100,
  },
});
