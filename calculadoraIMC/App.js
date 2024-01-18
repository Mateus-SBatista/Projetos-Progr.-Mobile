import React, {useState} from "react";
import{View, Text, StyleSheet, TextInput, TouchableOpacity} from 'react-native';

export default function App(){
  const [peso, setPeso] = useState(''); // armazena o peso
  const [altura, setAltura] = useState('') // armazena a altura

  function executarCalculos(){
    const alt = altura / 100;
    const imc = peso / (alt * alt);
    
    if (imc <17){
      alert('Você está muito abaixo do peso! IMC =  ' + imc.toFixed(2));
    }else if(imc >= 17 && imc < 18.59){
      alert('Você está abaixo do peso! IMC =  ' + imc.toFixed(2));
    }else if(imc >= 18.60 && imc < 24.99){
      alert('Peso Normal! IMC =  ' + imc.toFixed(2));
    }else if(imc >= 25 && imc < 29.9){
      alert('Acima do Peso! IMC =  ' + imc.toFixed(2));
    }else if(imc >=30 && imc < 34.9){
      alert('Obesidade I! IMC =  ' + imc.toFixed(2));
    }else if(imc >=35 && imc < 39.90){
      alert('Obesidade II(severa)! IMC =  ' + imc.toFixed(2));
    }else if(imc > 39.91){
      alert('Obesidade III(morbida)! IMC =  ' + imc.toFixed(2))
    }

    setAltura('')
    setPeso('')
  }

  return(
    <View style={estilo.container}>
      <Text style={estilo.title}>Calcule seu IMC </Text>

      <TextInput style={estilo.input}
      value={peso} //valor dentro do componente
      onChangeText={(peso)=> setPeso(peso)} //toda vez que o campo mudar ele é salvo
      placeholder="Peso (kg)"
      keyboardType= "numeric"
      />

      <TextInput style={estilo.input}
      value={altura} //valor dentro do componente
      onChangeText={(altura)=> setAltura(altura)} //toda vez que o campo mudar ele é salvo
      placeholder="Altura (cm)"
      keyboardType= "numeric"
      />

      <TouchableOpacity style={estilo.botao}
      onPress={executarCalculos}>
        <Text style={estilo.textoBotao}>Calcular</Text>
      </TouchableOpacity>

    </View>
  );
}

const estilo = StyleSheet.create({
  container:{
    flex: 1
  },
  title:{
    textAlign: 'center',
    marginTop: 35,
    fontSize: 30
  },
  input:{
  backgroundColor: '#DDD',
  borderRadius: 10,
  margin: 15,
  padding: 10,
  color: '#000',
  fontSize: 23
  },
  botao:{
      justifyContent: 'center',
      alignItems: 'center',
      margin: 15,
      backgroundColor: '#41Aef4',
      padding: 10,
      borderRadius: 10
  },
  textoBotao:{
    color: '#fff',
    fontSize: 25,
    fontWeight: "bold"
  }

});