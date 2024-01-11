import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';
import { addPost } from '../../helpers';

export default function CreatePost() {

  const [postInp, setPostInp] = useState();
  const { currentUser } = useContext(UserContext);

  return (

    <View>

      <Text style={[style.genericText]}>CreatePost</Text>
      <TextInput
        style={style.textInput}
        multiline={true}
        onChangeText={setPostInp}
        placeholder='qual e`'
      />
      <Button
        title='Send'
        onPress={() => addPost(
          currentUser.id,
          postInp)}
      />

    </View>
  )

}

const styles = StyleSheet.create({
  container: {

  },
});
