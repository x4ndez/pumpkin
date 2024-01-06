import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Alert, FlatList } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './context';
import { startEndTimeFormat, getDuration } from '../helpers/dateFormatting';
import { getSessionFromClass, attendSession, unattendSession, getAttendees } from '../helpers';

export default function SessionScreen({ route, navigation }) {

  const [sessionData, setSessionData] = useState();
  const [attendeeData, setAttendeeData] = useState();
  const [attendStatus, setAttendStatus] = useState({
    status: false,
  });
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const classData = route.params.classData;
  const dateData = route.params.dateData;

  const onLoad = async () => {
    const data = await getSessionFromClass(
      classData.id,
      new Date(dateData.dateJSON),
    );
    const dataAttendees = await getAttendees(data.id);
    setAttendeeData(dataAttendees);
    setSessionData(data);

    for (let item of data.attendees) {
      if (item.userId === currentUser.id) setAttendStatus({
        status: true,
        attendeeId: item.id,
      })
    }

  }

  useEffect(() => {
    onLoad();
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

      {sessionData && attendeeData
        ? (<>

          <View>
            {attendStatus.status
              ? <Button
                title='Unattend'
                onPress={async () => {
                  const res = await unattendSession(
                    currentUser.id,
                    sessionData.id,
                    attendStatus.attendeeId
                  )
                  if (res.code === 1) {
                    const update = await getAttendees(sessionData.id);
                    setAttendeeData(update);
                    setAttendStatus({ status: false })
                  } else {
                    Alert.alert('Error:', res.msg)
                  }

                }}
              />
              : <Button
                title='Attend'
                onPress={async () => {
                  const res = await attendSession(
                    currentUser.id,
                    sessionData.id
                  )
                  if (res.code === 1) {
                    const update = await getAttendees(sessionData.id);
                    setAttendeeData(update);
                    setAttendStatus({
                      status: true,
                      attendeeId: res.data.id,
                    });
                  } else {
                    Alert.alert('Error:', res.msg)
                  }
                }}
              />
            }


          </View>

          <View>
            {/* To be a flatlist of attendees */}
            <Text>Attendees</Text>

            <FlatList
              data={attendeeData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <Button
                  title={item.name}
                  onPress={() => {
                    navigation.navigate('Profile', {
                      memberId: item.id,
                    })
                  }}
                />
              )}
            />
          </View>

        </>)
        : <Text>Loading...</Text>}

      <View>
        {/* WOD to be assigned to day */}
        <Text>Workout of the Day</Text>
      </View>

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
  }
});
