import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../../config';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function AddWODBtn({navigation}) {

  return (

    <View>

      <Button
        title='Add WOD'
        onPress={() => navigation.navigate('Add WOD')}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    // backgroundColor: '#fff',
    // alignItems: 'center',
    // justifyContent: 'center',
  },
  modal: {
    backgroundColor: 'orange',
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
  pickerStyle: {
    backgroundColor: 'red',
    width: 300,
    height: 50,
    // color: 'green',
    display: 'flex'
  }
});
