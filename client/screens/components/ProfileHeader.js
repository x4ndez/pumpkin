import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, Linking, Modal, Alert, Switch, FlatList, TouchableOpacity, Image } from 'react-native';
import { useState, useEffect, useContext } from 'react';
import { UserContext } from '../context';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import { style } from '../styles';
import { formatDate } from '../../helpers/dateFormatting';
import SubHeading from './SubHeading';

export default function ProfileHeader({ props }) {

  const { currentUser } = useContext(UserContext);

  return (

    <View
      style={[{
        display: 'flex',
        justifyContent: 'flex-end',
        flexDirection: 'row',
        paddingRight: 10,
        marginTop: 10,
        marginBottom: 20,
      }]}
    >

      <View>

        <View style={{
          display: 'flex',
          alignItems: 'flex-end',
          paddingRight: 20,
        }}>
          <View style={{
            flexDirection: 'row',
          }}>



            <View style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              marginRight: 20,
            }}>

              <Text
                style={[style.genericText, style.h2]}
              >{props.name}</Text>
              <Text style={[style.subText, {
                marginBottom: 20,
              }]}>{formatDate(props.createdAt, 'MMYYYY')}</Text>

            </View>
            <Image
              source={require('../../assets/tom_photo.jpg')}
              style={{
                width: 50,
                height: 50,
                borderRadius: 20,
              }}
            />

          </View>

          <View>

            <SubHeading
              props={{
                title: 'About'
              }}
            />
            <Text style={[style.subText]}>{props.bio}</Text>

          </View>
        </View>

      </View>

      <View
        style={[style.classMarker, {
          marginRight: 0,
        }]}
      ></View>



    </View>

  )

}
