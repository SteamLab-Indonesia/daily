import React, {Component} from 'react';
import { View, Animated, Button } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

class CountdownScreen extends Component {
    state={
        isPlaying: true,
        onComplete: false
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
    this.setState({isPlaying:false})
}

    render(){
        const {timerMinute,timerHour} = this.props.route.params
        console.log(timerHour,timerMinute)
        return(
            <View style={{flex:1, flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                <CountdownCircleTimer
                    isPlaying={this.state.isPlaying}
                    duration={this.convertToSeconds()}
                    colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
                >
                    {({ remainingTime, animatedColor }) => (
                    <Animated.Text style={{ color: animatedColor, fontSize:23 }}>
                        {this.convertHMS(remainingTime)}
                    </Animated.Text>
                    )}
                <Button title='Pause' onPress={()=>this.pressPause()}></Button>
                </CountdownCircleTimer>
            </View>
        )
    }
}

export default CountdownScreen;