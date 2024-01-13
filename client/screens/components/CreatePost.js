import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';
import { addPost, getAllPosts } from '../../helpers';
import SubHeading from './SubHeading';

export default function CreatePost({ setPostsData }) {

  // THIS COMPONENT REQUIRES:
  // setPostsData useStates passed in as props so that the parent can update the flatList.

  const [postInp, setPostInp] = useState('');
  const { currentUser } = useContext(UserContext);
  const navigation = useNavigation();

  const onPostSubmit = async () => {

    const addedPost = await addPost(
      currentUser.id,
      postInp);
    setPostInp('');

    // update the posts in the parent flatlist
    const posts = await getAllPosts();
    setPostsData(posts);

    navigation.navigate('Post', {
      postId: addedPost.id
    })
  }

  return (

    <View>

      <View style={style.createPostContainer}>

        <SubHeading
          props={{
            title: 'Make an Announcement',
          }}
        />

        <View style={{ position: 'relative' }}>

          <TextInput
            style={style.createPostTextInput}
            multiline={true}
            value={postInp}
            onChangeText={setPostInp}
            placeholder="What's on your mind?"
          />

          <Pressable

            onPress={onPostSubmit}
            style={{
              position: 'absolute',
              right: 0,
              display: 'flex',
              alignItems: 'center',
              paddingTop: 10,
              paddingRight: 10,
            }}
          ><Image
              source={require('../../assets/send_full.png')}
              style={style.commentSendImg}
            /></Pressable>

        </View>

      </View>

    </View >
  )

}

const styles = StyleSheet.create({
  container: {

  },
});
