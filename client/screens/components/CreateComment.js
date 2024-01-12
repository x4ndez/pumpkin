import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';
import { addComment, addPost, getAllPosts, getSinglePost } from '../../helpers';

export default function CreateComment({ props, setPostData }) {

  // console.log(postSubmit, setPostSubmit)
  // THIS COMPONENT REQUIRES:
  // setPostsData useStates passed in as props so that the parent can update the flatList.

  const [commentInp, setCommentInp] = useState('');
  const { currentUser } = useContext(UserContext);

  const onCommentSubmit = async () => {

    const comment = await addComment(
      props.postId,
      currentUser.id,
      commentInp,
    );
    setCommentInp('');

    // update the comments in the parent flatlist
    const postData = await getSinglePost(props.postId)
    setPostData(postData);
  }

  return (

    <View>

      <Text style={[style.genericText]}>Leave a comment...</Text>
      <TextInput
        style={style.textInput}
        multiline={true}
        value={commentInp}
        onChangeText={setCommentInp}
        placeholder=''
      />

      <Button
        title='Send'
        onPress={onCommentSubmit}
      />

    </View >
  )

}

const styles = StyleSheet.create({
  container: {

  },
});
