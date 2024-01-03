import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Alert } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../config';
import { startEndTimeFormat, getDuration } from '../helpers/dateFormatting';

export default function SessionScreen({ route, navigation }) {

  const classData = route.params.classData;

  return (

    <View style={styles.container}>

      <View>
        <Text>{classData.className}</Text>
        <Text>{classData.classType}</Text>
        <Text>Time: {startEndTimeFormat(classData.startTime, classData.endTime)}</Text>
        <Text>Duration: {getDuration(classData.startTime, classData.endTime)}</Text>
      </View>
      <View>
        {/* To be a flatlist of attendees */}
        <Text>Attendees</Text>
      </View>
      <View>
        {/* WOD to be assigned to day */}
        <Text>Workout of the Day</Text>
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
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
  }
});
