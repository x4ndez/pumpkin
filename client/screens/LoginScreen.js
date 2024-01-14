import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Alert, Pressable, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './context';
import { localhostUrl } from '../config';
import { style } from './styles';

export default function LoginScreen({ navigation }) {

  const [emailInp, onChangeEmailInp] = useState('');
  const [passwordInp, onChangePasswordInp] = useState('');
  const [passwordHidden, setPasswordHidden] = useState(true);
  const [loginDisabled, setLoginDisabled] = useState(true);
  const { currentUser, setCurrentUser } = useContext(UserContext);

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

    if (resBody.code === 1) {
      setCurrentUser(resBody.data);
      navigation.navigate('Dashboard');
    }
    else Alert.alert('Error', `${resBody.msg}`);

  }

  useEffect(() => {

    if (emailInp.length > 0 && passwordInp.length > 0) {
      setLoginDisabled(false);
    } else {
      setLoginDisabled(true);
    }

  }, [emailInp, passwordInp])

  return (

    <View style={styles.container}>

      <Text style={styles.pumpkin}>PUMPKIN</Text>

      <View style={style.loginContainer}>

        <View style={[style.emailContainer, style.flexStartCenterRow, style.flexRow]}>
          <Text style={[style.genericText, {
            width: '20%',
          }]}>Email</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangeEmailInp}
            placeholder='xande@elegal.com.au'
            placeholderTextColor='#616161'
            textAlign='right'
          />
        </View>

        <View style={[style.passwordContainer, style.flexStartCenterRow, style.flexRow]}>
          <Text style={[style.genericText, {
            width: '20%',
          }]}>Password</Text>
          <TextInput
            style={styles.textInput}
            onChangeText={onChangePasswordInp}
            secureTextEntry={passwordHidden}
            // placeholder='Password'
            defaultValue='password'
            placeholderTextColor='#616161'
            textAlign='right'
          />
          <View style={[style.flexCenterCenterRow, style.flexRow, {
            width: '10%'
          }]}>
            <Pressable
              onPress={() => setPasswordHidden(
                passwordHidden ? false : true
              )}>
              <Image
                source={require('../assets/password_hide.png')}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </Pressable>
          </View>
        </View>


      </View>
      <View style={{
        width: '100%',
      }}>
        <Button
          title='Login'
          onPress={loginPress}
          disabled={loginDisabled}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    padding: 10,
    width: '100%',
    height: '100%',
    backgroundColor: '#212121',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textInput: {
    color: 'white',
    // backgroundColor: 'white',
    // borderColor: 'grey',
    // borderWidth: 1,
    // borderRadius: 5,
    // paddingLeft: 10,
    // paddingRight: 10,
    // paddingTop: 5,
    // paddingBottom: 5,
    // marginBottom: 5,
    width: '70%',
  },
  loginSubmit: {

  },
  pumpkin: {
    color: 'white',
    marginBottom: 100,
    fontSize: 40,
  },
});
