import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Alert, Vibration } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../config';
import { deleteUser } from '../helpers';
import { style } from './styles';
import SubHeading from './components/SubHeading';

export default function MembershipScreen({ navigation }) {

  return (

    <View>

      <Text>View Membership</Text>

    </View>
    
  );
}