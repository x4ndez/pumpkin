import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, FlatList, ScrollView, Pressable } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './context';
import AddMemberBtn from './components/AddMemberBtn';
import ViewMembersBtn from './components/ViewMembersBtn';
import AddClassBtn from './components/AddClassBtn';
import AddWODBtn from './components/AddWODBtn';
import SubHeading from './components/SubHeading';
import { style } from './styles';
import { getAllPosts, getWodsFromDate } from '../helpers';
import WodItem from './components/WodItem';
import CreatePost from './components/CreatePost';
import Post from './components/Post';

export default function DashboardScreen({ navigation }) {

  const [wodsData, setWodsData] = useState();
  const [postsData, setPostsData] = useState();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const onLoad = async () => {

    const wods = await getWodsFromDate(new Date(Date.now()));
    const posts = await getAllPosts();
    setWodsData(wods.data);
    setPostsData(posts);
  }

  useEffect(() => {
    onLoad();
  }, []);

  const adminTools = [
    <AddMemberBtn />,
    <ViewMembersBtn navigation={navigation} />,
    <AddClassBtn />,
    <AddWODBtn navigation={navigation} />,
    <Button
      title='View Week'
      onPress={() => {
        navigation.navigate('View Week');
      }}
    />,
  ]

  return (

    <View style={styles.container}>

      {currentUser.permissions === 'admin' &&
        <View>
          <SubHeading
            props={{
              title: 'Admin Tools'
            }}
          />

          <View>
            <ScrollView
              horizontal={true}
              contentContainerStyle={[styles.adminTools]}
            >

              <AddMemberBtn />
              <ViewMembersBtn navigation={navigation} />
              <AddClassBtn />
              <AddWODBtn navigation={navigation} />

            </ScrollView>
          </View>

          <CreatePost
            setPostsData={setPostsData}
          />
        </View>
      }

      {wodsData
        ?
        <View>
          <SubHeading
            props={{ title: 'Workout of the Day' }}
          />
          {wodsData.length > 0
            ? <FlatList
              data={wodsData}
              keyExtractor={item => item.id}
              renderItem={({ item }) => (

                <WodItem
                  props={{
                    item: item,
                  }}
                />

              )}
            />
            : <WodItem props={{ item: null }} />
          }
        </View >
        :
        <Text>Loading...</Text>
      }

      <Button
        title='View Week'
        onPress={() => {
          navigation.navigate('View Week');
        }}
      />

      <SubHeading
        props={{
          title: 'Announcements'
        }}
      />

      {postsData &&
        <FlatList
          data={postsData}
          keyExtractor={item => item.id}
          renderItem={({ item }) =>
            <Pressable
              onPressOut={() => navigation.navigate('Post', {
                postId: item.id
              })}
            >
              <Post
                props={{
                  item: item,
                }} />
            </Pressable>
          }
        />
      }



      {/* <View>
        <AddMemberBtn />
        <ViewMembersBtn navigation={navigation} />
        <AddClassBtn />
        <AddWODBtn navigation={navigation} />
        <Button
          title='View Week'
          onPress={() => {
            navigation.navigate('View Week');
          }}
        />
      </View> */}

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#212121',
    height: '100%',
    display: 'flex',
    justifyContent: 'flex-start',
    padding: 10,
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
    gap: 10,
    paddingBottom: 10,
  },
});
