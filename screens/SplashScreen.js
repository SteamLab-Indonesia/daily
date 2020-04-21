import React, {Component} from 'react';
import {View,Text, StyleSheet, StatusBar} from 'react-native';
import {
    Header,
    LearnMoreLinks,
    Colors,
    DebugInstructions,
    ReloadInstructions,
  } from 'react-native/Libraries/NewAppScreen';

class SplashScreen extends Component {
    componentDidMount = () => { //setelah render baru panggil ini
        setTimeout(() => {
            StatusBar.setHidden(false);
            this.props.navigation.navigate('Login')
        }, 1500)
    }
    render(){
        StatusBar.setHidden(true);
        return (
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor:'green' }}>
          <Text style={styles.sectionTitle}>SyncDo</Text>
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
      fontSize: 50,
      fontWeight: 'bold',
      color: Colors.lighter,
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

export default SplashScreen;
