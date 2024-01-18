import { useState, useEffect } from 'react';
import { Button, Text, View } from 'react-native';
import styled from 'styled-components';

const Page = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;
const HeaderText = styled.Text`
  font-size: 25px;
  margin-top: 30px;
`;
const Input = styled.TextInput`
  width: 90%;
  height: 50px;
  font-size: 18px;
  background-color: #eee;
  margin-top: 20px;
  border-radius: 10px;
  padding: 10px;
`;
const CalcButton = styled.Button`
  margin-top:10px;
`;
const ResultArea = styled.View`
  width: 100%;
  margin-top: 30px;
  background-color: #eee;
  padding: 20px;
  justify-content: center;
  align-items: center;
`;
const ResultItemTitle = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;
const ResultItem = styled.Text`
  font-size: 15px;
  margin-bottom: 30px;
`;
const PcArea = styled.View`
  flex-direction: row;
  margin: 20px;
  gap: 5px;
`;
const PcItem = styled.Button``;

export default function App() {
  const [bill, setBill] = useState(''); //conta 
  const [tip, setTip] = useState(0); // gorjeta
  const [pct, setPct] = useState(10); // porcentagem
  const calc = ()=>{
    let nBill = parseFloat(bill);

    if(nBill){
      setTip((pct/100) * nBill);
    }
  }

useEffect(()=>{
  calc();
},[pct]);


  return (
    <Page>
      <HeaderText>Calculadora de Gorjeta</HeaderText>
      <Input
      placeholder = "Quanto deu a conta?"
      placeholderTextColor ="#000"
      keyboardType = "numeric"
      value={bill}
      onChangeText={n=>setBill(n)}
      />
      <PcArea>
        <PcItem title = "5%" onPress={()=>setPct(5)}/>
        <PcItem title = "10%" onPress={()=>setPct(10)}/>
        <PcItem title = "15%" onPress={()=>setPct(15)}/>
        <PcItem title = "20%" onPress={()=>setPct(20)}/>
      </PcArea>

      <CalcButton title = {`Calcular ${pct}%`} onPress = {calc}/>
      
      {tip > 0 &&
      <ResultArea>
        <ResultItemTitle>Valor da Conta</ResultItemTitle>
        <ResultItem>R$ {parseFloat(bill).toFixed(2)}</ResultItem>

        <ResultItemTitle>Valor da Gorjeta</ResultItemTitle>
        <ResultItem>R$ {tip.toFixed(2)} ({pct}%)</ResultItem>

        <ResultItemTitle>Valor Total</ResultItemTitle>
        <ResultItem>R$ {(parseFloat(bill) + tip).toFixed(2)}</ResultItem>


      </ResultArea>
      }
    </Page>
    
  );
}
