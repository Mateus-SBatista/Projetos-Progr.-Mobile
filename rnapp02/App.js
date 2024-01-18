import React, {useState} from 'react';
import { Text, View } from 'react-native';
import styled from 'styled-components';

const Pagina = styled.SafeAreaView`
  flex: 1;
  justify-content: center;
  align-items: center;
`;

const Entrada = styled.TextInput`
  width: 200px;
  height: 40px;
  border: 1px solid #000;
`;

const Hello = function(){
  const[nome, setNome] = useState('BES UEPA');

  return (
    <View>
      <Entrada value={nome} onChangeText={(texto)=>{setNome(texto)}}/>
      <Text>Olá {nome}</Text>
    </View>
  );
}

export default function App() {
  return (
    <Pagina>
      <Hello/>
     </Pagina>
  );
}
