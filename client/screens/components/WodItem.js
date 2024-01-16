import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';

export default function WodItem({ props }) {

  const { currentUser } = useContext(UserContext);

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

        {props.item === null
          ? <Text
            style={[style.subText, style.h2]}
          >No workout assigned yet.</Text>
          :
          <View style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}>
            <Text
              style={[style.genericText, style.h2]}
            >{props.item.name}</Text>

            <Text
              style={[style.genericText, style.h2]}
            >{props.item.content}</Text>
          </View>
        }

      </View>

    </View>
  )

}

const styles = StyleSheet.create({
  container: {

  },
});
