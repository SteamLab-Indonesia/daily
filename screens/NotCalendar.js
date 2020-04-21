import React, {Component} from 'react';
import {Calendar, CalendarList, Agenda} from 'react-native-calendars';
import { TouchableOpacity, StyleSheet, Text, View, Alert } from 'react-native';

const vacation = {key:'vacation', color: 'red', selectedDotColor: 'blue'};
const massage = {key:'massage', color: 'blue', selectedDotColor: 'blue'};
const workout = {key:'workout', color: 'green'};

export default class ListCalendar extends Component{
    render(){
        return(
            <View>
            <CalendarList
                // Callback which gets executed when visible months change in scroll view. Default = undefined
                onVisibleMonthsChange={(months) => {console.log('now these months are visible', months);}}
                // Max amount of months allowed to scroll to the past. Default = 50
                pastScrollRange={50}
                // Max amount of months allowed to scroll to the future. Default = 50
                futureScrollRange={50}
                // Enable or disable scrolling of calendar list
                scrollEnabled={true}
                // Enable or disable vertical scroll indicator. Default = false
                showScrollIndicator={true}
                // Specify style for calendar container element. Default = {}
                style={{
                    borderWidth: 1,
                    borderColor: 'gray',
                    height: '100%'
                }}
                // Specify theme properties to override specific styles for calendar parts. Default = {}
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
            </View>
        )
    }
    
}
