import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../../config';

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



    <View style={styles.container}>

      <Modal
        visible={modalVisible}
        animationType='fade'
      >
        <View>
          <Button
            title='X'
            onPress={() => {
              setModalVisible(false);
            }}
          />
          <Text>Enter the name and email of the new member below...</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeNameInp}
            placeholder='Name'
          />
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeEmailInp}
            placeholder='Email'
          />
          <Button
            title='Add Member'
            onPress={addMemberPress}
          />
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
