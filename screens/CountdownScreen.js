import React, {Component} from 'react';
import { Animated } from 'react-native'
import { CountdownCircleTimer } from 'react-native-countdown-circle-timer'

class CountdownScreen extends Component {
    render(){
        return(
        <CountdownCircleTimer
            isPlaying
            duration={10}
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