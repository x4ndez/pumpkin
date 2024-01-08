import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';

export default function template() {

  const { currentUser } = useContext(UserContext);

  return (
    <Text>Template</Text>
  )

}

const styles = StyleSheet.create({
  container: {

  },
});
