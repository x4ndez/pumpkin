import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function ProfileButton() {

  const navigation = useNavigation();
  const { currentUser } = useContext(UserContext);

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
        onPress={() => navigation.navigate('Profile', {
          memberId: currentUser.id,
        })}
      >
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
