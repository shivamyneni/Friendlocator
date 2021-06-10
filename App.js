/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {StyleSheet} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import Signin from './components/Signin';
import Signup from './components/Signup';
import Main from './components/Main';

const App = () => {
  const Stack = createStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator InitialRouteName="Signin">
        <Stack.Screen
          options={{headerShown: false}}
          name="Signin"
          component={Signin}
        />
        <Stack.Screen
          options={{headerShown: false}}
          name="Signup"
          component={Signup}
        />
        <Stack.Screen
          name="Main"
          options={{headerShown: false}}
          component={Main}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
