import React, {Component} from 'react';
import { View, Animated, Button } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'
import {getStatistics, updateStatistics} from '../libs/database'

class CountdownScreen extends Component {
    state={
        isPlaying: true,
        buttonTitle: 'PAUSE'
    }
    
    convertToSeconds = () => {
        const {timerMinute,timerHour} = this.props.route.params
        let totalSeconds = timerHour*3600 + timerMinute*60
        return totalSeconds;
    }

    convertHMS = (totalSeconds) => {
        let hour = Math.floor(totalSeconds/3600);
        let minute = Math.floor((totalSeconds%3600)/60);
        let seconds = (totalSeconds%3600)%60;
        let output_str = ('00' + hour).slice(-2) + ':' + ('00' + minute).slice(-2) + ':' + ('00' + seconds).slice(-2)
        return output_str
    }

    pressPause = () => {
        if(this.state.isPlaying){
            this.setState({buttonTitle: 'START', isPlaying: false})
        }
        else
            this.setState({buttonTitle: 'PAUSE ', isPlaying: true})
    }

    pressReset = () => {
        initialRemainingTime
    }
    
    completeUpdate =() => {
        const {itemCategory} = this.props.route.params
        let year = new Date().getFullYear();
        let month = new Date().getMonth()+1
        getStatistics(month,year,itemCategory).then((data)=>{
            if(data)
                {
                    let duration = data.duration + convertToSeconds();
                    updateStatistics(data.id, duration)
                }
            else
            {
                let duration = convertToSeconds()
                addStatistics({year,month,category:itemCategory,duration})
            }
                
        })
    }

    render(){
        const {timerMinute,timerHour} = this.props.route.params
        return(
            <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <CountdownCircleTimer
                    isPlaying={this.state.isPlaying}
                    duration={this.convertToSeconds()}
                    colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
                    onComplete={()=>this.completeUpdate()}
                >
                    {({ remainingTime, animatedColor }) => (
                    <Animated.Text style={{ color: animatedColor, fontSize:23 }}>
                        {this.convertHMS(remainingTime)}
                    </Animated.Text>
                    )}
                </CountdownCircleTimer>
                <View style={{flex:1, flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                    <Button style={{marginTop:10}} title={this.state.buttonTitle} onPress={()=>this.pressPause()}></Button>
                    <Button style={{marginTop:10}} title='RESET' onPress={()=>this.pressReset()}></Button>
                </View>
            </View>
        )
    }
}

export default CountdownScreen;