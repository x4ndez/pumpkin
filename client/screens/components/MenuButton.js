import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';

export default function MenuButton() {

  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);

  const [menuActive, setMenuActive] = useState(false);

  return (

    // <View>

    //   <Button
    //     title='ME'
    //     onPress={() => navigation.navigate('Profile', {
    //       memberId: currentUser.id,
    //     })}
    //   />

    // </View>
    <View
    >
      <TouchableOpacity
        onPress={() => {
          setMenuActive(true);
        }}
      >

        <Modal
          transparent={true}
          visible={menuActive}
          animationType='fade'
        >
          <View
            style={[style.menuContainer]}
          >

            {/* DEAD SPACE, CLICKABLE TO EXIT MENU */}

            <Pressable
              style={[style.menuDeadSpace]}
              onPress={() => setMenuActive(false)}
            >
            </Pressable>

            {/* MAIN MENU CONTAINER */}

            <View
              style={[style.menuMain]}
            >
              <Pressable
                style={[style.menuBtn]}
                onPress={() => {
                  console.log('Go to Membership');
                  setMenuActive(false);
                  navigation.navigate('View Membership');
                }}
              >
                <Text>Membership</Text>
              </Pressable>
            </View>

          </View>
        </Modal>

        <Image
          source={require('../../assets/profile_icon.png')}
          style={styles.profileBtn}
        />
      </TouchableOpacity>
    </View>

  )

}

const styles = StyleSheet.create({
  container: {

  },
  profileBtn: {
    width: 30,
    height: 30,
    marginRight: 10,
  }
});
