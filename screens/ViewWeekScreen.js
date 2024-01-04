import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../config';
import { getClasses } from '../helpers';
import { startEndTimeFormat, getDuration } from '../helpers/dateFormatting';

export default function ViewWeekScreen({ navigation }) {

  const [weekArrayData, setWeekArrayData] = useState();
  const [classesData, setClassesData] = useState();

  const generateSchedule = async () => {
    const currDate = new Date(Date.now());
    const weekDay = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    const currDayNo = currDate.getDay();
    const weekArray = [];

    const classes = await getClasses();
    setClassesData(classes);

    for (let i = 0, day = currDate.getDay(); day <= 6; day++, i++) {

      const dayDate = new Date(
        currDate.setDate( // Use the value below to change the date based on the current date.
          i === 0 ? currDate.getDate() : currDate.getDate() + 1 // Get the current day number, then add the additional day each iteration.
        )
      );

      const y = classes.filter((val) => {
        for (let i = 0; i < val.daysActive.length; i++) {
          if (val.daysActive[i].day === weekDay[day]) return val;
        }
      });

      weekArray.push({
        dayName: weekDay[day],
        dayNo: day,
        dateJSON: dayDate.toJSON(),
        dateFormatted: dayDate.toLocaleDateString(),
        classes: y,
      })
    }

    setWeekArrayData(weekArray);

  }

  useEffect(() => {
    generateSchedule();
  }, []);

  return (

    <View style={styles.container}>

      {classesData
        &&

        <FlatList
          data={weekArrayData}
          keyExtractor={item => item.dayNo}
          renderItem={({ item }) => (
            <View>
              <View style={styles.dayContainer}>
                <Text
                  style={[styles.h1]}
                >{item.dayName}</Text>
                <Text>{item.dateFormatted}</Text>
              </View>

              {item.classes.length > 0 ?
                item.classes.map((val) => (
                  <Pressable
                    style={[styles.classContainer, styles.flexStartCenter]}
                    key={val.id}
                    onPress={() => navigation.navigate('Session', {
                      classData: val,
                      dateData: item,
                    })}
                  >

                    {/* CLASS TITLE */}
                    <Text
                      style={[styles.genericText, styles.h2]}
                    >{val.className}</Text>

                    <View
                      style={[styles.flexStartCenter, styles.flexRow]}
                    >

                      {/* CLASS TIME */}
                      <Text
                        style={[styles.genericText, styles.h2]}
                      >{startEndTimeFormat(val.startTime, val.endTime)}</Text>

                      {/* CLASS TYPE */}
                      <Text
                        style={[styles.classType]}>{val.classType}</Text>

                    </View>

                    {/* CLASS DURATION */}
                    <Text
                      style={[styles.subText]}
                    >{getDuration(val.startTime, val.endTime)}</Text>
                  </Pressable>
                ))
                : (
                  <View style={[styles.classContainer]}>
                    <Text
                      style={[styles.genericText]}
                    >No classes available.</Text>
                  </View>
                )
              }

            </View>
          )}
        />
      }

    </View>
  );
}

const styles = StyleSheet.create({
  genericText: {
    color: '#E0E0E0',
  },
  subText: {
    color: '#757575',
  },
  h1: {
    fontSize: 24,
    marginBottom: 5,
  },
  h2: {
    fontSize: 16,
    marginBottom: 5,
  },
  classType: {
    fontSize: 12,
    backgroundColor: '#FFCC80',
    borderRadius: 5,
    padding: 5,
    marginLeft: 10,
    color: '#424242',
  },
  container: {
    padding: 10,
    backgroundColor: '#212121',
  },
  dayContainer: {
    marginBottom: 10,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 5,
  },
  classContainer: {
    marginBottom: 10,
    // backgroundColor: 'purple',
    padding: 10,
    borderBottomColor: '#616161',
    borderBottomWidth: 0.5,
  },

  flexStartCenter: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  flexRow: {
    flexDirection: 'row',
  },
});
