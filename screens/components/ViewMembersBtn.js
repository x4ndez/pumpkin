import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../../config';


export default function ViewMembersBtn({ navigation }) {

  return (

    <View style={styles.container}>

      <Button
        title='View Members'
        onPress={() => {
          navigation.navigate('View Members');
        }}
      />

    </View>
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
