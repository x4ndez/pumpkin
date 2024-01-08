import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Vibration } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../config';
import { deleteUser } from '../helpers';

export default function ViewMembersScreen({ navigation }) {

  const [userData, setUserData] = useState();

  const readMembers = async () => {
    const data = await fetch(`http://${localhostUrl}:3000/api/users`);
    const listData = await data.json();
    setUserData(listData);
  }

  useEffect(() => {
    readMembers();
  }, []);

  return (

    <View style={styles.container}>

      <Text>View Members</Text>
      {userData
        ? <FlatList
          data={userData}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
          (<View>
            <Text>{item.name}</Text>
            <Button
              title='X'
              onPress={() => {
                Vibration.vibrate();
                Alert.alert('Confirm',
                  'Are you sure you want to delete this user?',
                  [{
                    text: 'Cancel', onPress: () => {
                      return;
                    },
                  },
                  {
                    text: 'Delete User', onPress: async () => {
                      const user = await deleteUser(item.id);
                      if (user.code === 1) {
                        readMembers();
                      } else {
                        Alert.alert('Error', user.msg)
                      }
                    },
                  }])
              }}
            />
            <Button
              title='Info'
              onPress={() => {
                navigation.navigate('Profile', {
                  memberId: item.id,
                })
              }}
            />
          </View>)
          }
        />
        : <Text>Loading...</Text>
      }

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
