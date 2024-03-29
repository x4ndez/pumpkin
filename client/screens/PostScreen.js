import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Alert, FlatList } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './context';
import { localhostUrl } from '../config';
import { getSinglePost } from '../helpers';
import Post from './components/Post';
import { style } from './styles';
import CreateComment from './components/CreateComment';
import Comment from './components/Comment';

export default function PostScreen({ route }) {

  const [postData, setPostData] = useState();
  const { currentUser } = useContext(UserContext)

  const onLoad = async () => {
    const postData = await getSinglePost(route.params.postId)
    setPostData(postData);
  }

  useEffect(() => {
    onLoad();
  }, []);

  return (

    <View
      style={styles.globalContainer}
    >

      {postData &&

        <View>

          <View
            style={styles.container}
          >
            <Post
              props={{
                item: postData,
              }} />

          </View>

          <View style={style.commentsContainerWrapper}>

            <View style={style.commentsContainer}>

              {postData.comments.length > 0
                ? <FlatList
                  data={postData.comments}
                  keyExtractor={item => item.id}
                  renderItem={(item) =>
                    <Comment
                      props={item}
                    />
                  }
                />
                : <Text style={style.genericText}>No comments.</Text>
              }



            </View>

            <CreateComment
              props={{
                postId: route.params.postId,
              }}
              setPostData={setPostData}
            />

          </View>

        </View>

      }

    </View>

  );
}

const styles = StyleSheet.create({
  container: {
    paddingLeft: 10,
    paddingRight: 10,
    width: '100%',
    height: '70%',
  },
  globalContainer: {
    backgroundColor: '#212121',
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
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
  },
  adminTools: {
    width: '100%',
    height: 100,
  },
});