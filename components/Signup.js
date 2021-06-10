import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Dimensions,
  Keyboard,
} from 'react-native';
import background from '../assets/images/travel.jpg';
import {auth} from '../firebaseconfig';
import * as Animatable from 'react-native-animatable';

const Signup = ({navigation}) => {
  const [email, setemail] = React.useState('');
  const [pwd, setpwd] = React.useState('');

  const signup = () => {
    auth
      .createUserWithEmailAndPassword(email, pwd)
      .then(res => {
        navigation.navigate('Main');
      })
      .catch(err => {
        alert('error');
      });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View style={styles.container}>
        <View style={{flex: 1}}>
          <Image
            style={{flex: 1, width: null, marginTop: -100}}
            source={background}
          />
        </View>
        <Animatable.Text
          style={styles.titleText}
          animation="fadeIn"
          delay={200}>
          Mapbox
        </Animatable.Text>
        <View style={styles.bottomView}>
          <Text style={styles.loginText}>Register</Text>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Email"
              autoCapitalize="none"
              keyboardType="email-address"
              textContentType="emailAddress"
              onChangeText={text => setemail(text)}
            />
          </View>
          <View style={styles.inputView}>
            <TextInput
              style={styles.input}
              placeholder="Password"
              secureTextEntry={true}
              autoCapitalize="none"
              onChangeText={text => setpwd(text)}
            />
          </View>
          <TouchableOpacity onPress={signup} style={styles.loginButton}>
            <Text style={styles.loginButtonText}>Signup</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.registerText}
            onPress={() => navigation.navigate('Signin')}>
            <Text style={{fontSize: 20}}>Already have an account?</Text>
            <Text
              style={{
                color: '#336b87',
                fontSize: 20,
              }}>
              {' Signin'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleText: {
    position: 'absolute',
    top: Dimensions.get('screen').height * 0.1,
    alignSelf: 'center',
    color: '#fff',
    fontSize: 60,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.44,
    shadowRadius: 10.32,
    elevation: 16,
  },
  bottomView: {
    height: '30%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-evenly',
    backgroundColor: '#fff',
    opacity: 0.95,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    paddingTop: 10,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  loginText: {
    fontSize: 25,
    marginTop: 12,
    marginBottom: 4,
  },
  inputView: {
    height: 40,
    borderRadius: 10,
    backgroundColor: '#f1f3f6',
    marginTop: 10,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
  },
  inputIcon: {
    paddingHorizontal: 8,
  },
  input: {
    height: 40,
    flex: 1,
    fontSize: 20,
    color: '#333',
  },
  loginButton: {
    backgroundColor: '#46aab8',
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 10,
  },
  loginButtonText: {
    color: '#fff',
    alignSelf: 'center',
    fontSize: 20,
    // fontFamily: "Montserrat-Regular",
  },
  registerText: {
    display: 'flex',
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop: 12,
    fontSize: 20,
    color: '#2a3132',
  },
  fpText: {
    marginTop: 10,
    alignSelf: 'flex-end',
    fontSize: 16,
    color: '#5352ed',
  },
});

export default Signup;
