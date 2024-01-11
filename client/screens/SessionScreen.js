import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Alert, FlatList, TouchableHighlight, TouchableOpacity } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './context';
import { startEndTimeFormat, getDuration } from '../helpers/dateFormatting';
import { getSessionFromClass, attendSession, unattendSession, getAttendees, getWodsFromDate } from '../helpers';
import { style } from './styles';
import SelectClass from './components/SelectClass';
import SubHeading from './components/SubHeading';
import WodItem from './components/WodItem';

export default function SessionScreen({ route, navigation }) {

  const [sessionData, setSessionData] = useState();
  const [attendeeData, setAttendeeData] = useState();
  const [wodsData, setWodsData] = useState();
  const [attendStatus, setAttendStatus] = useState({
    status: false,
  });
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const classData = route.params.classData; // Class data this session is associated with
  const dateData = route.params.dateData; // Date info regarding this session

  const onLoad = async () => {
    const wods = await getWodsFromDate(dateData.dateJSON);
    const data = await getSessionFromClass(
      classData.id,
      new Date(dateData.dateJSON),
    );
    const dataAttendees = await getAttendees(data.id);
    setWodsData(wods.data);
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

    <View style={[styles.container]}>



      <SelectClass
        props={{
          val: classData,
        }}
      />


      {sessionData && attendeeData
        ? (<>

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
          {/* To be a flatlist of attendees */}

          <SubHeading
            props={{ title: 'Attendees' }}
          />

          <View
            style={style.attendeeListContainer}
          >

            <FlatList
              data={attendeeData}
              horizontal={true}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (
                <View
                  style={[style.attendeeContainer]}
                >
                  <TouchableOpacity
                    style={[style.flexCenterCenterRow]}
                    onPress={() => {
                      navigation.navigate('Profile', {
                        memberId: item.id,
                      })
                    }}
                  >

                    <View
                      style={[style.attendeeListed]}
                    ><Text>?</Text></View>
                    <Text style={[style.genericText]}>{item.name}</Text>

                  </TouchableOpacity>
                </View>

              )}
            />

          </View>
        </>)
        : <Text>Loading...</Text>}

      {wodsData
        ?
        <View>
          <SubHeading
            props={{ title: 'Workout of the Day' }}
          />
          {wodsData.length > 0
            ? <FlatList
              data={wodsData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (

                <WodItem
                  props={{
                    item: item,
                  }}
                />

              )}
            />
            : <WodItem props={{ item: null }} />
          }
        </View >
        :
        <Text>Loading...</Text>
      }



    </View >
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: '#212121',
    height: '100%',
    width: '100%',
  },
});
