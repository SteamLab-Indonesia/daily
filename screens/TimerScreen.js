import React, {Component} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View, //div
  Text, //headings h1 h2
  StatusBar, //time, date
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

class TimerScreen extends Component{
  state = {
    buttonText: 'START',
    timer: null,
    totalSeconds: 300
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
    const {itemName} = this.props.route.params
    return(
      <View>
        <Text style={{fontSize:20}}>{itemName}</Text>
        <Text style={{fontSize:32}}>{strHMS}</Text>
        <Button title={this.state.buttonText} onPress={this.handlePress}></Button>
      </View>
    )
  }
}

const styles = StyleSheet.create({
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