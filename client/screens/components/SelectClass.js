import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';
import { getDuration, startEndTimeFormat } from '../../helpers/dateFormatting';

export default function SelectClass({ props }) {

  const { currentUser } = useContext(UserContext);
  const val = props.val;

  return (
    <View
      style={[style.classContainer, style.flexRow, style.flexStartCenterRow]}
    >

      <View
        style={style.classMarker}
      ></View>

      <View
        style={style.flexStartCenter}
      >

        {/* CLASS TITLE */}

        {val.className.length > 0
          && <Text
            style={[style.genericText, style.h2]}
          >{val.className}</Text>
        }

        <View
          style={[style.flexStartCenter, style.flexRow]}
        >

          {/* CLASS TIME */}
          <Text
            style={[style.genericText, style.h2]}
          >{startEndTimeFormat(val.startTime, val.endTime)}</Text>

          {/* CLASS TYPE */}
          <Text
            style={[style.classType]}>{val.classType}</Text>

        </View>

        {/* CLASS DURATION */}
        <Text
          style={[style.subText]}
        >{getDuration(val.startTime, val.endTime)}</Text>

      </View>

    </View>
  )

}

const styles = StyleSheet.create({
  container: {

  },
});
