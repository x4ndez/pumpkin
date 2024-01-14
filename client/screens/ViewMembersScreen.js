import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Vibration } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../config';
import { deleteUser } from '../helpers';
import { style } from './styles';
import SubHeading from './components/SubHeading';

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

      <SubHeading
        props={{
          title: 'View Members',
        }}
      />
      {userData
        ? <FlatList
          data={userData}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
          (<View style={style.memberContainer}>
            <View><Text style={[style.genericText]}>{item.name}</Text></View>
            <View>
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
            </View>
          </View>
          )} />
        : <Text>Loading...</Text>
      }

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212121',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: 10,
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
