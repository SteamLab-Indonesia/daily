import React, {Component} from 'react';
import {Alert, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import {Agenda} from 'react-native-calendars';
import {getReminder} from '../libs/database'

export default class AgendaScreen extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reminder: {}
    };
  }

  componentDidMount = () =>{
    getReminder().then((data) => {
      console.log(data)
        this.setState({reminder:data})
    })
  }
  

  render() {
    return (
      <Agenda
        items={this.state.reminder}
        selected={new Date()}
        renderItem={this.renderItem.bind(this)}
        renderEmptyDate={this.renderEmptyDate.bind(this)}
        rowHasChanged={this.rowHasChanged.bind(this)}
        style={{
            borderWidth: 1,
            borderColor: 'gray',
            height: '100%'
        }}
        theme={{
            backgroundColor: '#1B2732',
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

  renderItem(item) {
    return (
      <TouchableOpacity
        style={[styles.item, {height: 50}]} 
        onPress={() => Alert.alert(item.name)}
      >
        <Text>{item.name}</Text>
      </TouchableOpacity>
    );
  }

  renderEmptyDate() {
    return (
      <View style={styles.emptyDate}>
        <Text>This is empty date!</Text>
      </View>
    );
  }

  rowHasChanged(r1, r2) {
    return r1.name !== r2.name;
  }

  timeToString(time) {
    const date = new Date(time);
    return date.toISOString().split('T')[0];
  }
}

const styles = StyleSheet.create({
  item: {
    backgroundColor: 'lightgray',
    flex: 1,
    borderRadius: 5,
    padding: 10,
    marginRight: 10,
    marginTop: 17
  },
  emptyDate: {
    height: 15,
    flex:1,
    paddingTop: 30
  }
});