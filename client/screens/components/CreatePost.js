import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';
import { addPost, getAllPosts } from '../../helpers';

export default function CreatePost({ setPostsData }) {

  // console.log(postSubmit, setPostSubmit)
  // THIS COMPONENT REQUIRES:
  // setPostsData useStates passed in as props so that the parent can update the flatList.

  const [postInp, setPostInp] = useState('');
  const { currentUser } = useContext(UserContext);

  const onPostSubmit = async () => {

    await addPost(
      currentUser.id,
      postInp);
    setPostInp('');

    // update the posts in the parent flatlist
    const posts = await getAllPosts();
    setPostsData(posts);
  }

  return (

    <View>

      <Text style={[style.genericText]}>Create Post</Text>
      <TextInput
        style={style.textInput}
        multiline={true}
        value={postInp}
        onChangeText={setPostInp}
        placeholder='qual e`'
      />

      <Button
        title='Send'
        onPress={onPostSubmit}
      />

    </View >
  )

}

const styles = StyleSheet.create({
  container: {

  },
});
