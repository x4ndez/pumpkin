import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, FlatList, ScrollView } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from './context';
import AddMemberBtn from './components/AddMemberBtn';
import ViewMembersBtn from './components/ViewMembersBtn';
import AddClassBtn from './components/AddClassBtn';
import AddWODBtn from './components/AddWODBtn';
import SubHeading from './components/subHeading';
import { style } from './styles';
import { getWodsFromDate } from '../helpers';
import WodItem from './components/WodItem';

// update wod
// update profile
// update class

export default function DashboardScreen({ navigation }) {

  const [wodsData, setWodsData] = useState();
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const onLoad = async () => {

    const wods = await getWodsFromDate(new Date(Date.now()));
    setWodsData(wods.data);

  }

  useEffect(() => {
    onLoad();
  }, []);

  console.log(currentUser)

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
              horizontal
              style={[styles.adminTools]}
            >

              <AddMemberBtn />
              <ViewMembersBtn navigation={navigation} />
              <AddClassBtn />
              <AddWODBtn navigation={navigation} />


            </ScrollView>
          </View>
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
    width: '100%',
    height: 100,
  },
});
