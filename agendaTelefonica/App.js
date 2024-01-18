import React, { useState } from 'react';
import { View, Text, Image, StatusBar, TouchableOpacity, Alert } from 'react-native';
import styled from 'styled-components/native';
import TabelaTelefonica from '@react-native-async-storage/async-storage';

// view que contém todo o conteúdo da tela
const Container = styled.SafeAreaView`
  flex: 1;
  align-items: center;
`;

// view que contém o título
const HeaderText = styled.View`
  height: 50px;
  align-items: center;
  justify-content: center;
  background-color: #2980b9;
  width: 100%;
`;

// texto do título
const Title = styled.Text`
  font-size: 24px;
  font-weight: bold;
  color: white;
`;

// view que contém os inputs
const InputContainer = styled.View`
  margin-top: 20px;
  width: 80%;
`;

// input de texto
const Input = styled.TextInput`
  height: 50px;
  font-size: 18px;
  background-color: #eee;
  margin-top: 20px;
  border-radius: 10px;
  border-color: #ccc;
  padding: 5px;
`;

// view que contém o botão
const ButtonContainer = styled.View`
  margin-top: 10px;
  width: 80%;
`;

// botão
const Button = styled.TouchableOpacity`
  height: 50px;
  background-color: #2980b9;
  border-radius: 10px;
  justify-content: center;
  align-items: center;
`;

// texto do botão
const ButtonText = styled.Text`
  font-size: 18px;
  color: white;
`;

// linha que divide os inputs do botão
const DividerLine = styled.View`
  margin-top: 10%;
  height: 8px;
  width: 100%;
  background-color: #2980b9;
`;

// texto que mostra o resultado da busca
const ResultText = styled.Text`
  font-size: 18px;
  margin-top: 20px;
`;


export default function App() {
  const [nome, setNome] = useState(''); // variável que armazena o nome do contato
  const [fone, setFone] = useState(''); // variável que armazena o telefone do contato
  const [ResultadoBusca, setResultadoBusca] = useState(''); // variável que armazena o resultado do contato

  const BuscarContato = async (nome) =>{
    try{
      if(nome === ""){
        alert('Por favor, insira um nome!');
        return;
      }
      const value = await TabelaTelefonica.getItem(nome);
      if(value !== null){
        setResultadoBusca(value);
      }else{
        alert("Nome não encontrado!") 
      }
    }catch(error){
      alert('Erro ao buscar o contato');
    } finally {
      setNome(''); // Limpa o campo de nome
      setFone(''); // Limpa o campo de telefone
    }
  }

  const Adicionar = (nome, fone) =>{
    if (nome === '' || fone === ''){
      alert("Por favor, insira um nome e um telefone!");
      return;
    } else {
      TabelaTelefonica.setItem(nome, fone);
      alert("Contato salvo com sucesso!");
    }
    setNome(''); // Limpa o campo de nome
    setFone(''); // Limpa o campo de telefone
  }

  const Excluir = (nome)=>{
    if(nome === ''){
      alert("Por favor, insira um nome.");
      return;
    } else {
      TabelaTelefonica.getItem(nome).then((value)=>{
        if(value !== null){
          TabelaTelefonica.removeItem(nome);
          alert("Contato excluído com sucesso!"); 
        } else {
          alert("Nome não encontrado")
        }
      }).catch((error)=>{
        alert("Erro ao excluir o contato!")
      }).finally(() => {
        setNome(''); // Limpa o campo de nome
        setFone(''); // Limpa o campo de telefone
        setResultadoBusca(''); // Limpa o campo de resultado
      });
    }
  };
  

  return ( 
    <Container>
      <StatusBar barStyle="light-content" backgroundColor="#2980b9" />
      <HeaderText>
        <Title>Agenda de Mateus Batista</Title>
      </HeaderText>
      <InputContainer>
        <Input
          placeholder="Nome"
          value={nome}
          onChangeText={text => setNome(text)}
        />
        <Input
          placeholder="Telefone"
          value={fone}
          keyboardType='numeric'
          onChangeText={text => setFone(text)}
        />
      </InputContainer>
      <ButtonContainer>
        <Button onPress={()=>Adicionar(nome,fone)}>
          <ButtonText>Adicionar Contato</ButtonText>
        </Button>
      </ButtonContainer>

      <ButtonContainer>
        <Button onPress={()=>BuscarContato(nome)}>
          <ButtonText>Buscar Contato</ButtonText>
        </Button>
      </ButtonContainer>

      <ResultText>{ResultadoBusca}</ResultText>

      <ButtonContainer>
        <Button onPress={()=>Excluir(nome)}>
          <ButtonText>Excluir Contato</ButtonText>
        </Button>
      </ButtonContainer>

    </Container>
  );
}