import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image, Pressable } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';
import SubHeading from './SubHeading';
import { formatDate } from '../../helpers/dateFormatting';

export default function Comment({ props }) {

  const { content, createdBy, createdAt } = props.item;
  const { currentUser } = useContext(UserContext);
  const navigation = useNavigation();

  return (
    <View style={{
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-start',
      alignItems: 'flex-start',
      marginBottom: 8,
    }}>
      {/* <Text style={style.genericText}>{createdBy.name} says:</Text> */}
      <View style={{
        backgroundColor: '#42A5F5',
        borderRadius: 10,
        paddingTop: 2,
        paddingBottom: 2,
        paddingLeft: 10,
        paddingRight: 10,
        marginRight: 10,
      }}>
        <Text style={style.genericText}>{content}</Text>
      </View>
      <View style={{
      }}>
        <Pressable
          onPress={() =>
            navigation.navigate('Profile', {
              memberId: createdBy.id,
            })
          }
        >
          <View style={[style.flexStartCenterRow, style.flexRow]}>
            <View style={[style.commentUserHeading]}>
              <Text style={style.subText}>{createdBy.name}</Text>
            </View>
          </View>

        </Pressable>
        <View>
          <Text style={[style.subText, {
            fontSize: 12,
            marginLeft: 10,
            marginTop: 2,
          }]}>{formatDate(createdAt, '12hrDDMMYYYY')}</Text>
        </View>
      </View>
    </View>
  )

}