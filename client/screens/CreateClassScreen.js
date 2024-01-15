import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './context';
import { localhostUrl } from '../config';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import RNDateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { style } from './styles';
import SubHeading from './components/SubHeading';
import { timeFormat } from '../helpers/dateFormatting';

export default function CreateClassScreen({ navigation }) {

  const { currentUser } = useContext(UserContext);
  const pickerOptions = [
    'Crossfit',
    'Strength',
    'Circuit',
    'HIIT',
    'Competition',
    'Cry Zone',
  ];

  const [classNameInp, setClassNameInp] = useState();
  const [classTypeInp, setClassTypeInp] = useState(pickerOptions[0]);
  const [startTimeInp, setStartTimeInp] = useState(new Date());
  const [endTimeInp, setEndTimeInp] = useState(new Date());
  const [startTimePickerVisible, setStartTimePickerVisible] = useState(false);
  const [endTimePickerVisible, setEndTimePickerVisible] = useState(false);
  const [dateInp, setDateInp] = useState(new Date(Date.now()));
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

  async function addClass() {

    const payload = {
      className: classNameInp,
      classType: classTypeInp,
      startTime: startTimeInp,
      endTime: endTimeInp,
      dateOf: dateInp,
      recurring: recurringInp,
      daysActive: daysActiveInp,
    }

    const res = await fetch(`http://${localhostUrl}:3000/api/classes`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(payload),
    });

    const feedback = await res.json();

    Alert.alert(`Session`, feedback.msg);
    navigation.navigate('Dashboard');

  }

  return (
    <View style={styles.container}>

      <View>

        <SubHeading
          props={{
            title: 'Class Name'
          }}
        />
        <TextInput
          style={styles.textInput}
          onChangeText={setClassNameInp}
          placeholder='Iron WOD'
          placeholderTextColor='#757575'
        />
        <SubHeading
          props={{
            title: 'Class Type'
          }}
        />
        <Picker
          style={styles.pickerStyle}
          dropdownIconColor='white'
          dropdownIconRippleColor='white'
          mode='dropdown'
          selectedValue={classTypeInp}
          onValueChange={(itemValue, itemPosition) => setClassTypeInp(itemValue)}
        >
          {pickerOptions.map((val, i) => <Picker.Item key={i} label={val} value={val} />)}
        </Picker>

        <View style={[{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }]}>

          <SubHeading
            props={{
              title: 'Start Time'
            }}
          />
          <Button
            title={timeFormat(startTimeInp)}
            onPress={() => setStartTimePickerVisible(true)}
          />

          {startTimePickerVisible
            ? (<RNDateTimePicker
              mode='time'
              value={startTimeInp}
              onChange={(event, selectedTime) => {
                setStartTimeInp(new Date(selectedTime));
                setEndTimeInp(new Date(selectedTime.setHours(selectedTime.getHours() + 1)));
                setStartTimePickerVisible(false);
              }}
            />)
            : <></>
          }

        </View>

        <View style={[{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }]}>

          <SubHeading
            props={{
              title: 'End Time'
            }}
          />

          <Button
            title={timeFormat(endTimeInp)}
            onPress={() => setEndTimePickerVisible(true)}
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

        </View>

        <View
          style={{
            display: 'flex',
            alignItems: 'flex-end'
          }}>
          <Text style={style.subText}>
            {'Duration: ' + (endTimeInp.getHours() - startTimeInp.getHours()) + ' hours '}
            {(endTimeInp.getMinutes() - startTimeInp.getMinutes()) + ' minutes'}
          </Text>
        </View>

        <View style={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>
          <SubHeading
            props={{
              title: 'Repeat'
            }}
          />
          <Switch
            value={recurringInp}
            onValueChange={setRecurringInp}
          />
        </View>

        {
          recurringInp
            ? (
              <View
                style={styles.daysContainer}
              >
                <FlatList
                  data={daysActiveInp}
                  horizontal
                  renderItem={({ item }) => (
                    <View
                      style={styles.daySwitchContainer}>
                      <Text
                        style={[{
                          color: 'white',
                          marginRight: 10,
                        }]}
                      >{item.day}</Text>
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
              </View>
            )
            : <Text></Text>
        }

      </View>

      <View style={{
        marginBottom: 20,
      }}>
        <Button
          title='Create Class'
          onPress={addClass}
        />
      </View>

    </View >
  );

}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#212121',
    padding: 10,
    height: '100%',
    // alignItems: 'center',
    // justifyContent: 'center',
    display: 'flex',
    justifyContent: 'space-between'
  },
  textInput: {
    backgroundColor: '#313131',
    color: 'white',
    // borderColor: 'grey',
    // borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 5,
    paddingBottom: 5,
    marginBottom: 5,
    // width: '40%',
  },
  pickerStyle: {
    // backgroundColor: '#313131',
    borderRadius: 20,
    color: 'white',
  },
  daysContainer: {

  },
  daySwitchContainer: {
    display: 'flex',
    flexDirection: 'row',
    backgroundColor: '#414141',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
    paddingLeft: 20,
    paddingRight: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 30,
  },
  daySwitch: {
    display: 'flex',
    justifyContent: 'center',
    marginLeft: 10,
  }
});