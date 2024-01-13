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

    <View
      style={[style.commentTextContainer]}
    >

      <View
        style={[style.flexRow, style.commentTextWrapper]}
      >

        <TextInput
          style={[style.commentTextInput]}
          multiline={true}
          value={commentInp}
          onChangeText={setCommentInp}
          placeholder='Leave a comment...'
        />

        <Pressable
          style={[style.commentSend, style.flexCenterCenterRow]}
          onPress={onCommentSubmit}
        >
          <Image
            style={style.commentSendImg}
            source={require('../../assets/send_full.png')}
          />
        </Pressable>

      </View>

    </View >
  )

}

const styles = StyleSheet.create({
  container: {

  },
});
