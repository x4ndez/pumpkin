import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { style } from '../styles';

export default function SubHeading({ props }) {

  return (
    <View
      style={style.flex}
    >
      <Text
        style={[style.featureHeading]}
      >{props.title}</Text>
    </View>
  )

}

const styles = StyleSheet.create({
  container: {

  },
});
