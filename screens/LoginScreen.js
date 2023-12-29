import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../config';

export default function LoginScreen({ navigation }) {

  const [emailInp, onChangeEmailInp] = useState();
  const [passwordInp, onChangePasswordInp] = useState();

  async function loginPress() {

    const userInp = {
      email: emailInp,
      password: passwordInp,
    }

    const res = await fetch(`http://${localhostUrl}:3000/login`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(userInp),
    });

    const resBody = await res.json();

    if (resBody.code === 1) navigation.navigate('Dashboard');
    else Alert.alert('Error', `${resBody.msg}`);

  }

  return (

    <View style={styles.container}>

      <Text>Pumpkin</Text>

      <TextInput
        style={styles.textInput}
        onChangeText={onChangeEmailInp}
        placeholder='Email'
      />
      <TextInput
        style={styles.textInput}
        onChangeText={onChangePasswordInp}
        secureTextEntry={true}
        placeholder='Password'
      />
      <Button
        title='Login'
        onPress={loginPress}
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
