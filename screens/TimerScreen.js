import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View, //div
  Text, //headings h1 h2
  Button as RNButton,
  StatusBar, //time, date
  Dimensions,
  TextInput
} from 'react-native';

import {Button} from 'native-base' 
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import {updateReminder, deleteReminder} from '../libs/database'

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
    minuteSelected: 0,
    editMode: false,
    taskName: this.props.route.params.itemName
  }


  onChangeMinute = (selectedItem) => {
    this.setState({minuteSelected:selectedItem})
  }

  onChangeHour = (selectedItem) => {
    this.setState({hourSelected:selectedItem})
  }

  updateTask = (itemID) => {
    updateReminder(itemID, {task: this.state.taskName})
    this.setState({editMode:false})
    console.log('update task')
  }

  convertHMS = () => {
    let totalSeconds = this.state.totalSeconds;
    let hour = Math.floor(totalSeconds/3600);
    let minute = Math.floor((totalSeconds%3600)/60);
    let seconds = (totalSeconds%3600)%60;
    let output_str = ('00' + hour).slice(-2) + ':' + ('00' + minute).slice(-2) + ':' + ('00' + seconds).slice(-2)
    return output_str
  }
  
  toggleEditMode = () => {
    let {editMode, taskName} = this.state;
    this.setState({editMode: !editMode, taskName});
  }
  render(){
    let strHMS = this.convertHMS()
    const {itemName,itemCategory,itemDate, itemID} = this.props.route.params //get parameter value from reminder.js    
    return(
      <View style={{flex:1, flexDirection:'column', justifyContent: 'center', alignItems:'center'}}>
        {this.state.editMode? 
          <View style={{flexDirection: 'row', justifyContent: 'space-evenly', alignItems:'center'}}>
            <TextInput 
              style={{fontSize: 20, width: 150}}
              value={this.state.taskName} 
              onChangeText={(text)=> this.setState({taskName:text})}
              onBlur={()=>this.updateTask(itemID)}
              onEndEditing={()=>this.updateTask(itemID)}
              ref={input => this.taskRef = input}  
              autoFocus={true}
            />
            <RNButton title="Save" onPress={()=>this.updateTask(itemID)}/>
          </View> : <Text style={{fontSize:20}}>{this.state.taskName}</Text>}
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
        <RNButton style={styles.buttonText} title={this.state.buttonText} 
        onPress={()=>this.props.navigation.navigate('Countdown', {itemDate,itemName, itemCategory,timerHour:this.state.hourSelected, timerMinute:this.state.minuteSelected})}></RNButton>
        
        <View style={styles.buttons}>
          <Button vertical onPress={()=>updateReminder(itemID,{complete:true})} style={{width: '33.333%', height:50, backgroundColor:'transparent', borderColor:'lightgray', borderWidth:0.2}}>
            <MaterialCommunityIcons name="check" size={20}/>
            <Text>Complete</Text>
          </Button>
          <Button vertical onPress={()=> this.toggleEditMode()} style={{width: '33.333%', height:50, backgroundColor:'transparent', borderColor:'lightgray', borderWidth:0.2}}> 
            <MaterialCommunityIcons name="square-edit-outline" size={25} />
            <Text>Edit</Text>
          </Button>
          <Button vertical onPress={()=>deleteReminder(id)} style={{width: '33.333%', height:50, backgroundColor:'transparent', borderColor:'lightgray', borderWidth:0.2}}>
            <MaterialCommunityIcons name="delete-outline" size={25} />
            <Text>Delete</Text>
          </Button>
        </View>

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
  buttons: {
    position: 'absolute',
    flexDirection:'row',
    alignItems: 'center', 
    justifyContent: 'center',
    right: 5, 
    bottom: 5,
    zIndex: 9
  },
});

export default TimerScreen;