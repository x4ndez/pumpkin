import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Alert } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './context';
import { startEndTimeFormat, getDuration } from '../helpers/dateFormatting';
import { getSessionFromClass } from '../helpers';

export default function SessionScreen({ route, navigation }) {

  const [sessionData, setSessionData] = useState();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const classData = route.params.classData;
  const dateData = route.params.dateData;

  const onLoad = async () => {
    const data = await getSessionFromClass(
      classData.id,
      new Date(dateData.dateJSON),
    );
    console.log(data);
  }

  useEffect(() => {
    onLoad();
    // console.log(typeof classData.id)
  }, []);

  return (

    <View style={styles.container}>

      <View>
        <Text>{dateData.dateFormatted}</Text>
        <Text>{classData.className}</Text>
        <Text>{classData.classType}</Text>
        <Text>Time: {startEndTimeFormat(classData.startTime, classData.endTime)}</Text>
        <Text>Duration: {getDuration(classData.startTime, classData.endTime)}</Text>
      </View>

      <View>
        <Button
          title='Attend'
        />
      </View>

      <View>
        {/* To be a flatlist of attendees */}
        <Text>Attendees</Text>
      </View>

      <View>
        {/* WOD to be assigned to day */}
        <Text>Workout of the Day</Text>
      </View>

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
  }
});
