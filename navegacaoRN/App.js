import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Home from './src/pages/Home';
import Perfil from './src/pages/Perfil';
import Sobre from './src/pages/Sobre';

const Stack = createNativeStackNavigator()

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        
        <Stack.Screen name='Home' component={Home}/>
        <Stack.Screen name='Sobre' component={Sobre}/>
        <Stack.Screen name='Perfil' component={Perfil}/>

      </Stack.Navigator>
    </NavigationContainer>
  );
}
