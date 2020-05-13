import React, { memo, useState, useEffect } from 'react';
import { TouchableOpacity, StyleSheet, Text, Alert } from 'react-native';
import { CheckBox , View, Left } from 'native-base';
import Background from '../components/Background';
import Logo from '../components/Logo';
import Header from '../components/Header';
import Button from '../components/Button';
import TextInput from '../components/TextInput';
import { theme } from '../core/theme';
import { emailValidator, passwordValidator } from '../core/utils';
import { login } from '../libs/database';
import { getAccount, getLatestEmail, saveLatestEmail, saveAccount} from '../libs/cache';
import { acc } from 'react-native-reanimated';
import messaging from '@react-native-firebase/messaging';

const LoginScreen = ({ navigation }) => {
  
  const [email, setEmail] = useState({ value: '', error: '' });
  const [password, setPassword] = useState({ value: '', error: '' });
  const [checkboxPress, setCheckboxPress] = useState({ value: false , error: '' });
  
  useEffect(() => {
    let latestEmail = getLatestEmail();

    if(latestEmail != ''){
      let account = getAccount(latestEmail);
      if (account)
      {
        const unsubscribe = messaging().onMessage(async remoteMessage => {
          Alert.alert('A new FCM message arrived!', JSON.stringify(remoteMessage));
        });

        setEmail({ value: latestEmail, error: ''});
        setPassword({ value: account.password, error: ''})    ;    
        //doLogin(latestEmail,account.password);
        return unsubscribe;
      }
    }
  },[])

  const doLogin = (email,password) => {
    login(email, password).then((resp) => {
      saveAccount(email,password)
      saveLatestEmail(email)
      setEmail({ value: '', error: ''})
      setPassword({ value: '', error: ''})
      setCheckboxPress({ value: false, error: ''}) //need these 3 lines?
      navigation.navigate('Main');
    })
    .catch((err) => {
        alert(err);
    })
  }

  const _onLoginPressed = () => {
    const emailError = emailValidator(email.value);
    const passwordError = passwordValidator(password.value);

    if (emailError || passwordError) {
      setEmail({ ...email, error: emailError });
      setPassword({ ...password, error: passwordError });
      return;
    }
    doLogin(email.value,password.value)
  };

  const _onSignUpPressed = () =>{
    navigation.navigate('SignUp');
  }

  return (
    <Background>

      <Logo />

      <Header>Welcome back</Header>

      <TextInput
        label="Email"
        returnKeyType="next"
        value={email.value}
        onChangeText={text => setEmail({ value: text, error: '' })}
        error={!!email.error}
        errorText={email.error}
        autoCapitalize="none"
        autoCompleteType="email"
      />

      <TextInput
        label="Password"
        returnKeyType="done"
        value={password.value}
        onChangeText={text => setPassword({ value: text, error: '' })}
        error={!!password.error}
        errorText={password.error}
        secureTextEntry
      />
        <CheckBox checked={checkboxPress.value} onPress={()=>setCheckboxPress({value:!value, error: ''})}/>
        <Text style={{color:'white'}}>Remember Me</Text>
      <Button title="Login" onPress={_onLoginPressed} />
      <Button title="New User? SIGN UP" onPress={_onSignUpPressed} />
      {/* <View style={styles.forgotPassword}>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPasswordScreen')}
        >
          <Text style={styles.label}>Forgot your password?</Text>
        </TouchableOpacity>
      </View>

      

      <View style={styles.row}>
        <Text style={styles.label}>Don’t have an account? </Text>
        <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
          <Text style={styles.link}>Sign up</Text>
        </TouchableOpacity>
      </View> */}
    </Background>
  );
};

const styles = StyleSheet.create({
  forgotPassword: {
    width: '100%',
    alignItems: 'flex-end',
    marginBottom: 24,
    marginTop: 8,
  },
  row: {
    flexDirection: 'row',
    marginTop: 4,
  },
  label: {
    color: theme.colors.secondary,
  },
  link: {
    fontWeight: 'bold',
    color: theme.colors.primary,
  },
});

export default memo(LoginScreen);