import React from 'react';
import { View, Text, Button } from 'react-native';

export default function Sobre({route}) {
  return (
    <View>
      <Text> Meu nome é: {route.params.nome} </Text>
    
     </View>
  );
}
