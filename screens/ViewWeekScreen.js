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
                <Text>{item.dayName}</Text>
                <Text>{item.dateFormatted}</Text>
              </View>

              {item.classes.length > 0 ?
                item.classes.map((val) => (
                  <Pressable
                    style={styles.classContainer}
                    key={val.id}
                    onPress={() => navigation.navigate('Session', {
                      classData: val,
                    })}
                  >
                    <Text>{val.className}</Text>
                    <Text>{val.classType}</Text>
                    <Text>Time: {startEndTimeFormat(val.startTime, val.endTime)}</Text>
                    <Text>Duration: {getDuration(val.startTime, val.endTime)}</Text>
                  </Pressable>
                ))
                : (
                  <View style={styles.classContainer}>
                    <Text>No classes available.</Text>
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
  },
  dayContainer: {
    marginBottom: 10,
    backgroundColor: 'pink',
    padding: 10,
    borderRadius: 5,
  },
  classContainer: {
    marginBottom: 10,
    backgroundColor: 'purple',
    padding: 10,
    borderRadius: 5,
  }
});
