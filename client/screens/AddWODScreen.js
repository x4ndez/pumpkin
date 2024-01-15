import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../config';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import SubHeading from './components/SubHeading';

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

      <View
        style={{
          width: '100%'
        }}>

        <SubHeading
          props={{
            title: 'Name'
          }}
        />
        <TextInput
          style={styles.textInput}
          placeholder='Fran'
          placeholderTextColor='#757575'
          onChangeText={setName}
        />

        <SubHeading
          props={{
            title: 'Workout'
          }}
        />
        <TextInput
          style={styles.textInputContent}
          multiline={true}
          textAlign='left'
          textAlignVertical='top'
          placeholder='Enter your WOD here.'
          placeholderTextColor='#757575'
          onChangeText={setContent}
        />
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          <SubHeading
            props={{
              title: 'Select Date'
            }}
          />

          <Button
            title={
              loggedDate
                ? loggedDate.toLocaleDateString()
                : 'Click to select'
            }
            onPress={() => setDatePickerVisible(true)}
          />

        </View>

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

      </View>

      <View
        style={{
          marginBottom: 20,
          width: '100%'
        }}
      >
        <Button
          title='Add WOD'
          onPress={addWOD}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#212121',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    padding: 10,
    height: '100%',
    width: '100%'
  },
  textInput: {
    color: 'white',
    backgroundColor: '#313131',
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
  },
  textInputContent: {
    backgroundColor: '#313131',
    color: 'white',
    borderRadius: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 15,
    paddingBottom: 15,
    marginBottom: 5,
    width: '100%',
    height: 300,
  }
});
