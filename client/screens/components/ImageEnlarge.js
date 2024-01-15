import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function ImageEnlarge({ props }) {

  // CURRENTLY UNUSED, WILL BE A MODAL TO ENLARGE PHOTOS

  const { currentUser } = useContext(UserContext);

  return (

    <View style={{
      width: '100%',
      height: '100%',
    }}>

      <Modal
        transparent={true}
        animationType='fade'
      >

        <Pressable
          onPress={() => console.log('lol')}
          style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >

          <View
            style={{
              width: '100%',
              height: '100%',
              backgroundColor: 'black',
              opacity: 0.85,
              position: 'absolute',
              borderRadius: 30,
            }}
          ></View>
          <Image
            source={require(`../${props.source}`)}
            style={{
              height: 300,
              width: 300,
            }}
          />
        </Pressable>

      </Modal>

    </View>

  )

}

const styles = StyleSheet.create({
  container: {

  },
});
