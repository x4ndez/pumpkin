import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import DateTimePicker from 'react-native-modal-datetime-picker';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../../config';
import RNDateTimePicker from '@react-native-community/datetimepicker';

export default function AddClassBtn() {

  const pickerOptions = [
    'Crossfit',
    'Strength',
    'Circuit',
    'HIIT',
    'Competition',
    'Cry Zone',
  ];

  const [classNameInp, setClassNameInp] = useState();
  const [classTypeInp, setClassTypeInp] = useState();
  const [timePeriodInp, setTimePeriodInp] = useState(); // [x, x, y, y]
  const [startTimeInp, setStartTimeInp] = useState(new Date());
  const [endTimeInp, setEndTimeInp] = useState(new Date());
  const [startTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [endTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [dateInp, setDateInp] = useState(Date.now());
  const [recurringInp, setRecurringInp] = useState(false);
  const [daysActiveInp, setDaysActiveInp] = useState([
    { day: 'Monday', active: false },
    { day: 'Tuesday', active: false },
    { day: 'Wednesday', active: false },
    { day: 'Thursday', active: false },
    { day: 'Friday', active: false },
    { day: 'Saturday', active: false },
    { day: 'Sunday', active: false },

  ]);

  const [modalVisible, setModalVisible] = useState(false);

  const setDate = (event, date) => {
    const {
      type,
      nativeEvent,
    } = event;
  };


  useEffect(() => {
    console.log(startTimeInp)
  }, [startTimeInp]);

  // className  String
  //   classType  String
  //   timePeriod String
  //   date       DateTime
  //   recurring  Boolean
  //   daysActive String ?

  // async function addClassPress({ navigation }) {

  //   const classInp = {

  //   }

  //   const res = await fetch(`http://${localhostUrl}:3000/api/users`, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify(userInp),
  //   });

  //   const resBody = await res.json();

  //   onChangeEmailInp('');
  //   onChangeNameInp('');
  //   setModalVisible(false);
  //   Alert.alert(resBody.code === 1 ? 'Success!' : 'Failure!', resBody.msg);

  // }

  return (



    <View style={styles.container}>

      <Modal
        visible={modalVisible}
        animationType='fade'
      // transparent={true}
      >
        <View style={styles.modal}>
          <Button
            title='X'
            onPress={() => {
              // Clear all form elements
              setModalVisible(false);
              setClassNameInp();
              setClassTypeInp();
              setRecurringInp(false);
              setDaysActiveInp(daysActiveInp.filter((val, i) => {
                val.active = false;
                return val;
              }));
            }}
          />
          <Text>Class Name</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={setClassNameInp}
            placeholder='Iron WOD'
          />
          <Text>Class Type</Text>
          <Picker
            style={styles.pickerStyle}
            selectedValue={classTypeInp}
            onValueChange={(itemValue, itemPosition) => setClassTypeInp(itemValue)}
          >
            {pickerOptions.map((val, i) => <Picker.Item key={i} label={val} value={val} />)}
          </Picker>

          <Button
            title='Start Time'
            onPress={() => setStartTimePickerVisible(true)}
          />
          <Button
            title={startTimeInp.toLocaleTimeString()}
          />

          {startTimePickerVisible
            && (<RNDateTimePicker
              mode='time'
              value={startTimeInp}
              onChange={(event, selectedTime) => {
                setStartTimeInp(new Date(selectedTime));
                setStartTimePickerVisible(false);
              }}
            />)
          }

          <Button
            title='End Time'
            onPress={() => setEndTimePickerVisible(true)}
          />
          <Button
            title={endTimeInp.toLocaleTimeString()}
          />

          {endTimePickerVisible
            && (<RNDateTimePicker
              mode='time'
              value={endTimeInp}
              onChange={(event, selectedTime) => {
                setEndTimeInp(new Date(selectedTime));
                setEndTimePickerVisible(false);
              }}
            />)
          }

          <Text>Duration: </Text>

          <Text>Recurring Days?</Text>
          <Switch
            value={recurringInp}
            onValueChange={setRecurringInp}
          />

          {recurringInp
            ? (
              <FlatList
                data={daysActiveInp}
                renderItem={({ item }) => (
                  <View>
                    <Text>{item.day}</Text>
                    <Switch
                      value={item.active}
                      onValueChange={() => {
                        setDaysActiveInp(daysActiveInp.filter((val, i) => {
                          if (val.day === item.day) {
                            val.active = val.active === true ? false : true;
                            return val;
                          }
                          if (val.day != item.day) return val.day;
                        }))

                      }}
                    />
                  </View>
                )}
              />
            )
            : <Text></Text>}



          <Button
            title='Add Class'
          // onPress={addClassPress}
          />
        </View>
      </Modal>

      <Button
        title='Add Class'
        onPress={() => {
          setModalVisible(true);
        }}
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
