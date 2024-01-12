import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';

export default function Comment({ props }) {

  const { content, createdBy } = props.item;

  console.log(props.item)
  const { currentUser } = useContext(UserContext);

  return (
    <View>
      <Text style={style.genericText}>{createdBy.name} says:</Text>
      <Text style={style.genericText}>{content}</Text>
    </View>
  )

}