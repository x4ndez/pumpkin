import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../../config';
import { style } from '../styles';
import SubHeading from './SubHeading';

export default function AddMemberBtn() {

  const [emailInp, onChangeEmailInp] = useState();
  const [nameInp, onChangeNameInp] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  async function addMemberPress({ navigation }) {

    const userInp = {
      emailInp: emailInp,
      nameInp: nameInp,
    }

    const res = await fetch(`http://${localhostUrl}:3000/api/users`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInp),
    });

    const resBody = await res.json();

    onChangeEmailInp('');
    onChangeNameInp('');
    setModalVisible(false);
    Alert.alert(resBody.code === 1 ? 'Success!' : 'Failure!', resBody.msg);

  }

  return (

    <View>

      <Modal
        visible={modalVisible}
        animationType='fade'
        transparent={true}
      >

        <Pressable style={{
          backgroundColor: 'black',
          opacity: 0.85,
          height: '100%',
          width: '100%',
          position: 'absolute',
        }}
          onPress={() => setModalVisible(false)}
        ></Pressable>

        <View style={{
          width: '100%',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          padding: 10,
          zIndex: 5,
          marginTop: 50,
        }}>

          <View style={{
            backgroundColor: '#212121',
            width: '80%',
            paddingTop: 10,
            paddingBottom: 10,
            paddingLeft: 20,
            paddingRight: 20,
            borderRadius: 20,
            // borderWidth: 0.5,
            // borderColor: 'grey',
          }}>
            {/* <Button
              title='X'
              onPress={() => {
                setModalVisible(false);
              }}
            /> */}

            <SubHeading
              props={{
                title: 'New Member'
              }}
            />

            <Text style={style.subText}>Enter the name and email of the new member below...</Text>

            <View style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#313131',
              alignItems: 'center',
              width: '100%',
              paddingLeft: 15,
              borderRadius: 20,
              marginBottom: 10,
              marginTop: 10,
            }}>
              <View style={{
                width: '20%',
              }}>
                <Text style={style.genericText}>Name</Text>
              </View>
              <View style={{
                width: '80%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 15,
              }}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={onChangeNameInp}
                  textAlign='right'
                  placeholder='Tom Riddle'
                  placeholderTextColor='#757575'
                />
              </View>
            </View>

            <View style={{
              display: 'flex',
              flexDirection: 'row',
              backgroundColor: '#313131',
              alignItems: 'center',
              width: '100%',
              paddingLeft: 15,
              borderRadius: 20,
            }}>
              <View style={{
                width: '20%',
              }}>
                <Text style={style.genericText}>Email</Text>
              </View>
              <View style={{
                width: '80%',
                display: 'flex',
                flexDirection: 'row',
                justifyContent: 'flex-end',
                paddingRight: 15,
              }}>
                <TextInput
                  style={styles.textInput}
                  onChangeText={onChangeEmailInp}
                  textAlign='right'
                  placeholder='tomriddle@hogwarts.com.uk'
                  placeholderTextColor='#757575'
                />
              </View>
            </View>

            <View style={{
              marginTop: 20,
              marginBottom: 10,
            }}>
              <Button
                title='Add Member'
                onPress={addMemberPress}
              />
            </View>
          </View>

        </View>
      </Modal>

      <Button
        title='Add Member'
        onPress={() => {
          setModalVisible(true);
        }}
      />

    </View>
  );
}

const styles = StyleSheet.create({
  textInput: {
    color: 'white',
  },
});
