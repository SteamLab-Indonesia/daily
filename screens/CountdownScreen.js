import React, {Component} from 'react';
import { Animated } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

convertToSeconds = () => {
    let totalSeconds = timerHour*3600 + timerMinute*60
    return totalSeconds;
}

class CountdownScreen extends Component {
    render(){
        const {timerMinute,timerHour} = this.props.route.params
        console.log(timerHour,timerMinute)
        return(
        <CountdownCircleTimer
            isPlaying
            duration={this.convertToSeconds()}
            colors={[['#004777', 0.33], ['#F7B801', 0.33], ['#A30000']]}
        >
            {({ remainingTime, animatedColor }) => (
            <Animated.Text style={{ color: animatedColor }}>
                {remainingTime}
            </Animated.Text>
            )}
        </CountdownCircleTimer>
        )
    }
}

export default CountdownScreen;