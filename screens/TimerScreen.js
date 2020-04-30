import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View, //div
  Text, //headings h1 h2
  StatusBar, //time, date
  Button,
  Dimensions,
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {WheelPicker} from 'react-native-wheel-picker-android'

//Array(60) = create a new empty array with length 60
//Array(60).keys = will get [0,1,2,3,...60]
//Array.from(...) = create an array with value inside brackets from (...)
const hourOptions = Array.from(Array(24).keys()).map((key)=> (('00')+key).slice(-2));
const minuteOptions = Array.from(Array(60).keys()).map((key)=> (('00')+key).slice(-2)); 

class TimerScreen extends Component{
  state = {
    buttonText: 'START',
    timer: null,
    totalSeconds: 300,
    hourSelected: 0,
    minuteSelected: 5
  }

  onChangeMinute = (selectedItem) => {
    this.setState({minuteSelected:selectedItem})
  }

  onChangeHour = (selectedItem) => {
    this.setState({hourSelected:selectedItem})
  }

  reduceTimer =()=>{
    let totalSeconds = this.state.totalSeconds;
    totalSeconds--
    this.setState({totalSeconds})
  }

  handlePress =()=>{
    if (this.state.timer == null){
      let timer = setInterval(() => this.reduceTimer(), 1000);
      this.setState({timer, totalSeconds: 300, buttonText : 'STOP'})
    }
    else{
      clearInterval(this.state.timer);
      this.setState({timer:null, buttonText : 'START'})
    }
  }

  convertHMS = () => {
    let totalSeconds = this.state.totalSeconds;
    let hour = Math.floor(totalSeconds/3600);
    let minute = Math.floor((totalSeconds%3600)/60);
    let seconds = (totalSeconds%3600)%60;
    let output_str = ('00' + hour).slice(-2) + ':' + ('00' + minute).slice(-2) + ':' + ('00' + seconds).slice(-2)
    return output_str
  }
  
  render(){
    let strHMS = this.convertHMS()
    const {itemName} = this.props.route.params //get parameter value from reminder.js
    return(
      <View style={{flex:1, flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
        <Text style={{fontSize:20}}>{itemName}</Text>
        <View style = {{height:'20%', flexDirection:'row'}}>
          <WheelPicker
          data={hourOptions}
          onItemSelected={this.onChangeHour}
          selectedItem={this.state.hourSelected}
          />
          <WheelPicker
          data={minuteOptions}
          onItemSelected={this.onChangeMinute}
          selectedItem={this.state.minuteSelected}
          />
        </View>
        
        {/* <Text style={{fontSize:32}}>{strHMS}</Text> */}
        <Button style={styles.buttonText} title={this.state.buttonText} 
        onPress={()=>this.props.navigation.navigate('Countdown'), {timerHour:this.state.hourSelected, timerMinute:this.state.minuteSelected}}></Button>
      </View>
    )
  }
}

const screen = Dimensions.get('window');

const styles = StyleSheet.create({
    buttonText:{
        borderWidth: 10,
        borderColor: '#B9AAFF',
        width: screen.width/2,
        height: screen.width/2,
        borderRadius: screen.width/2,
        alignItems: 'center',
        justifyContent: 'center'
    },
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});

export default TimerScreen;