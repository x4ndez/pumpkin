import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking } from 'react-native';
import { useState, useEffect } from 'react';
import { getSingleMember } from '../helpers';
import { formatDate } from '../helpers/dateFormatting';

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
          <View
            style={styles.memberHeader}
          >
            <View
              style={styles.memberImage}
            >

            </View>
            <View
              style={styles.memberDescription}
            >
              <Text style={styles.h2}>{userData.name}</Text>
              <Text style={styles.h3}>{userData.proficiency}</Text>
              <Text style={styles.h3}>Member Since: {formatDate(userData.createdAt, 'MMYYYY')}</Text>
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
    margin: 10,
    backgroundColor: '#fff',
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
