import React, { useState, useRef, useEffect } from 'react';
import { View, Text, TextInput, StatusBar, TouchableOpacity, Alert, Keyboard } from 'react-native';
import styled from 'styled-components/native';
import api from './src/services/api';

const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

const HeaderText = styled.View`
  height: 65px;
  align-items: center;
  justify-content: center;
  background-color: #2980b9;
  width: 100%;
`;

const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
  width: 70%;
`;

const InputContainer = styled.View`
  width: 80%;
  margin-bottom: 45px;
`;

const InputWrapper = styled.View`
  height: 60px;
  background-color: white;
  margin-top: 20px;
  border-radius: 10px;
  border-color: #2980b9;
  border-width: 4px;
  padding: 5px;
  text-align: center;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

const Input = styled.TextInput`
  height: 60px;
  font-size: 18px;
  background-color: white;
  margin-top: 20px;
  border-radius: 10px;
  border-color: #2980b9;
  border-width: 4px;
  padding: 5px;
  text-align: center;
`;

const InputText = styled.Text`
  font-size: 18px;
  flex: 1;
  color: ${props => props.value ? 'black' : '#9e9e9e'};
  text-align: center;
`;

const ButtonContainer = styled.View`
  margin-top: 10px;
  width: 50%;
`;

const Button = styled.TouchableOpacity`
  height: 60px;
  background-color: ${props => props.color};
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

export default function App() {
  const [realValue, setRealValue] = useState('');
  const [dollarValue, setDollarValue] = useState('');
  const [euroValue, setEuroValue] = useState('');

  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  const converteRealDolar = async () => {
    if (!realValue || parseFloat(realValue.replace(',', '.')) === 0) {
      Alert.alert('Erro', 'Informe um valor válido em Real');
      return;
    }

    try {
      const response = await api.get('/last/USD-BRL');
      const dollarRate = response.data.USDBRL.high;
      const convertedValue = (parseFloat(realValue.replace(',', '.')) / parseFloat(dollarRate)).toFixed(2);
      const convertedValueWithComma = convertedValue.replace('.', ',');
      setDollarValue(convertedValueWithComma);
      Keyboard.dismiss();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro na conversão. Por favor, tente novamente.');
    }
  };

  const converteRealEuro = async () => {
    if (!realValue || parseFloat(realValue.replace(',', '.')) === 0) {
      Alert.alert('Erro', 'Informe um valor válido em Real');
      return;
    }

    try {
      const response = await api.get('/last/EUR-BRL');
      const euroRate = response.data.EURBRL.high;
      const convertedValue = (parseFloat(realValue.replace(',', '.')) / parseFloat(euroRate)).toFixed(2);
      const convertedValueWithComma = convertedValue.replace('.', ',');
      setEuroValue(convertedValueWithComma);
      Keyboard.dismiss();
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro na conversão. Por favor, tente novamente.');
    }
  };

  const handleClear = () => {
    setRealValue('');
    setDollarValue('');
    setEuroValue('');
    inputRef.current.focus();
    Keyboard.dismiss();
  };

  return (
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#2980b9" />
      <HeaderText>
        <Title>Conversor de Moedas do aluno Mateus Batista</Title>
      </HeaderText>
      <InputContainer>
        <Input
          ref={inputRef}
          placeholder="Entre com o valor em Real"
          keyboardType="numeric"
          value={realValue}
          onChangeText={value => setRealValue(value)}
        />
        <TextInput
          ref={inputRef}
          style={{ position: 'absolute', opacity: 0 }}
          keyboardType="numeric"
          value={realValue}
          onChangeText={value => setRealValue(value)}
        />
      </InputContainer>
      <ButtonContainer>
        <Button color="#2980b9" onPress={converteRealDolar}>
          <Text style={{ color: 'white', fontSize: 18 }}>Real para Dólar</Text>
        </Button>
      </ButtonContainer>
      {dollarValue !== '' && (
        <InputContainer>
          <InputWrapper>
            <InputText>{dollarValue ? `$ ${dollarValue}` : '$ Valor em Dolar'}</InputText>
          </InputWrapper>
        </InputContainer>
      )}
      <ButtonContainer>
        <Button color="#2980b9" onPress={converteRealEuro}>
          <Text style={{ color: 'white', fontSize: 18 }}>Real para Euro</Text>
        </Button>
      </ButtonContainer>
      {euroValue !== '' && (
        <InputContainer>
          <InputWrapper>
            <InputText>{euroValue ? `€ ${euroValue}` : '€ Valor em Euro'}</InputText>
          </InputWrapper>
        </InputContainer>
      )}
      <ButtonContainer>
        <Button color="red" onPress={handleClear}>
          <Text style={{ color: 'white', fontSize: 18 }}>Limpar</Text>
        </Button>
      </ButtonContainer>
    </Container>
  );
}