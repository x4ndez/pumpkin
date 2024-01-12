import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';

export default function Post({ props }) {

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

        {props.post === null
          ? <Text
            style={[style.subText, style.h2]}
          >No posts yet.</Text>
          :
          <View>
            <Text
              style={[style.genericText, style.h2]}
            >{props.item.content}</Text>
          </View>
        }

      </View>

    </View>

  )

}
