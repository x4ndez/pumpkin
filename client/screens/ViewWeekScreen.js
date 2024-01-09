import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, TextInput, Button, FlatList, Pressable } from 'react-native';
import { useState, useEffect } from 'react';
import { localhostUrl } from '../config';
import { getClasses } from '../helpers';
import { startEndTimeFormat, getDuration } from '../helpers/dateFormatting';
import SelectClass from './components/SelectClass';

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
              <View style={[styles.dayContainer, styles.flexStartCenterRow, styles.flexRow]}>
                <Text
                  style={[styles.h3Bold, styles.dayText]}
                >{item.dayName}</Text>
                <Text
                  style={[styles.subText, styles.dayDateText]}
                >{item.dateFormatted}</Text>
              </View>

              {item.classes.length > 0 ?

                item.classes.map((val, i) => (

                  <Pressable
                    key={val.id}
                    onPress={() => navigation.navigate('Session', {
                      classData: val,
                      dateData: item,
                    })}
                  >
                    {/* PRESSABLE INDIVIDUAL CLASS */}
                    <SelectClass
                      key={i}
                      props={{
                        val: val,
                      }} />
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
  h3Bold: {
    fontWeight: 'bold',
  },
  dayText: {
    color: 'white',
    margin: 5,
  },
  dayDateText: {
    marginLeft: 20,
  },
  classType: {
    fontSize: 12,
    backgroundColor: '#FFCC80',
    borderRadius: 5,
    padding: 2,
    paddingLeft: 10,
    paddingRight: 10,
    marginLeft: 10,
    color: '#424242',
  },
  container: {
    padding: 10,
    backgroundColor: '#212121',
    height: '100%'
  },
  dayContainer: {
    backgroundColor: '#424242',
    width: '100%',
    borderRadius: 5,
    paddingLeft: 10,
  },
  classContainer: {
    paddingTop: 20,
    paddingBottom: 20,
    borderBottomColor: '#616161',
    borderBottomWidth: 0.5,
  },
  classMarker: {
    width: 8,
    height: '100%',
    backgroundColor: '#B2BABB',
    marginRight: 20,
    borderRadius: 5,
  },
  flexStartCenter: {
    display: 'flex',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  flexStartCenterRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  flexRow: {
    flexDirection: 'row',
  },
});
