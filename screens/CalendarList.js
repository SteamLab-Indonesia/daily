import React, {Component} from 'react';
import {CalendarList} from 'react-native-calendars';
import {StyleSheet, View, ScrollView, Text} from 'react-native';

const testIDs = require('../testIDs');

class CalendarListjs extends Component {
    state = {
        selected: undefined
      };
    
    onDayPress = (day) => {
      this.setState({selected: day.dateString});
    }

  render() {
      console.log(this.state.selected)
    return (
      <CalendarList
        testID={testIDs.calendarList.CONTAINER}
        current={new Date()}
        pastScrollRange={24}
        futureScrollRange={24}
        style={styles.calendar}
        hideExtraDays
        onDayPress={this.onDayPress}
        markedDates={{
            [this.state.selected]: {
                selected: true, 
                disableTouchEvent: true, 
                selectedDotColor: 'orange'
            }
        }}
        style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: '100%'
        }}
        theme={{
            backgroundColor: '#ffffff',
            calendarBackground: '#1B2732',
            textSectionTitleColor: '#b6c1cd',
            selectedDayBackgroundColor: '#00adf5',
            selectedDayTextColor: '#ffffff',
            todayTextColor: '#00adf5',
            dayTextColor: '#bcc6cf',
            textDisabledColor: '#d9e1e8',
            dotColor: '#00adf5',
            selectedDotColor: '#ffffff',
            arrowColor: 'orange',
            disabledArrowColor: '#d9e1e8',
            monthTextColor: '#8dabc7',
            indicatorColor: 'blue',
            textDayFontFamily: 'helvetica',
            textMonthFontFamily: 'helvetica',
            textDayHeaderFontFamily: 'helvetica',
            textDayFontWeight: '300',
            textMonthFontWeight: 'bold',
            textDayHeaderFontWeight: '300',
            textDayFontSize: 16,
            textMonthFontSize: 20,
            textDayHeaderFontSize: 16
        }}
      />
    );
  }
}

const styles = StyleSheet.create({
    calendar: {
      marginBottom: 10
    },
    text: {
      textAlign: 'center',
      padding: 10,
      backgroundColor: 'lightgrey',
      fontSize: 16
    }
  });

export default CalendarListjs;