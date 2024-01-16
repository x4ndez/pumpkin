import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';
import { formatDate } from '../../helpers/dateFormatting';

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
          <View style={{
            paddingLeft: 20,
            paddingRight: 20,
          }}>
            <Text
              style={[style.genericText, style.h2]}
            >{props.item.content}</Text>
            <Text style={[style.subText]}>{formatDate(props.item.createdAt, 'ddDDMMYYYY')}</Text>
          </View>
        }

      </View>

    </View>

  )

}
