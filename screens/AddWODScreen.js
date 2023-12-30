import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../config';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function AddWODScreen({ navigation }) {

  const [name, setName] = useState();
  const [content, setContent] = useState();
  const [dateSelected, setDateSelected] = useState(new Date()); // Is used for the DateTimePicker only
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [loggedDate, setLoggedDate] = useState(); // What will be sent to the DB

  const addWOD = async () => {

    const payload = {
      name: name,
      content: content,
      dateOf: loggedDate,
    }

    const res = await fetch(`http://${localhostUrl}:3000/api/wod`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    const resBody = await res.json();
    if (resBody.code === 1) navigation.navigate('Dashboard');

  }



  return (

    <View style={styles.container}>

      <Text>Add a WOD</Text>
      <Text>Name</Text>
      <TextInput
        style={styles.textInput}
        placeholder='Fran'
        onChangeText={setName}
      />

      <Text>WOD</Text>
      <TextInput
        style={styles.textInputContent}
        multiline={true}
        placeholder='Enter your WOD here.'
        onChangeText={setContent}
      />

      <Button
        title='Select Date'
        onPress={() => setDatePickerVisible(true)}
      />
      <Button
        title={
          loggedDate
            ? loggedDate.toLocaleDateString()
            : ''
        }
      />

      {datePickerVisible
        && (<RNDateTimePicker
          mode='date'
          value={dateSelected}
          onChange={(event, selectedDate) => {
            setDateSelected(new Date(selectedDate));
            setLoggedDate(selectedDate);
            setDatePickerVisible(false);
          }}
        />)
      }

      <Button
        title='Add WOD'
        onPress={addWOD}
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
  textInputContent: {
    backgroundColor: 'white',
    borderColor: 'grey',
    borderWidth: 1,
    borderRadius: 5,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
    width: '90%',
    height: 300,
  }
});
