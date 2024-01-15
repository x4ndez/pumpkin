import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking } from 'react-native';
import { useState, useEffect } from 'react';
import { getSingleMember } from '../helpers';
import { formatDate } from '../helpers/dateFormatting';
import ProfileHeader from './components/ProfileHeader';

export default function ProfileScreen({ route, navigation }) {

  const [userData, setUserData] = useState();

  const onLoad = async () => {
    setUserData(await getSingleMember(route.params.memberId))
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (

    <View style={styles.container}>

      {userData
        ? (

          <View style={{
            display: 'flex',
            alignItems: 'flex-end'
          }}>

            <ProfileHeader
              props={userData}
            />

            <View style={{
              backgroundColor: '#313131',
              width: '100%',
              height: '100%',
              borderRadius: 20
            }}>

              <View style={{
                width: 150,
                height: 150,
                backgroundColor: '#414141',
                margin: 10,
                borderRadius: 30,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}>
                <Text style={{
                  fontSize: 12,
                  color: '#757575',
                  letterSpacing: 2,
                }}>
                  CLASSES
                </Text>

                <Text style={{
                  fontSize: 60,
                  color: 'white'
                }}>
                  {userData.classesBooked}
                </Text>
              </View>

            </View>
          </View>

        )
        : <Text>Loading...</Text>
      }



    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    backgroundColor: '#212121',
    height: '100%',
    width: '100%'
    // alignItems: 'center',
    // justifyContent: 'flex-start',
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
  memberHeader: {
    display: 'flex',
    flexDirection: 'row',
    width: '100%',
    height: 100,
    backgroundColor: 'orange',
    padding: 10,
  },
  memberImage: {
    width: '30%',
    height: 50,
    backgroundColor: 'green',
  },
  memberDescription: {
    width: '70%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  h2: {
    fontSize: 16,
  },
  h3: {
    fontSize: 12,
  }
});
