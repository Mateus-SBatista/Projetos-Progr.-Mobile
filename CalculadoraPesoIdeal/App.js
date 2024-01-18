import React from 'react'
import styled from 'styled-components';
import { useState } from 'react';

const Container = styled.SafeAreaView`
    flex: 1;
`;

const Title = styled.Text`
    text-align: center;
    margin-top: 30px;
    font-size: 30px;
    font-weight: bold;
`;

const Input = styled.TextInput`
    background-color: #DDD;
    border-radius: 10px;
    margin: 15px;
    padding: 10px;
    font-size: 23px;
    color: #000;
`;

const Botao = styled.TouchableOpacity`  
    background-color: #41aef4;
    justify-content: center;
    align-items: center;
    margin: 15px;
    padding: 10px;
    border-radius: 10px;
`;

const TextoBotao = styled.Text`
    color: #FFF;
    font-size: 25px;
`;

const MensagemResultado = styled.Text`
    margin-left: 20px;
    font-size: 20px;
    font-weight: bold;
`;

function CalculadoraPesoIdeal() {

    const [peso, setPeso] = useState('')
    const [altura, setAltura] = useState('')
    const [sexo, setSexo] = useState('')

    const [pesoIdeal, setPesoIdeal] = useState('')
    const [pesoIdealAjustado, setPesoIdealAjustado] = useState('')

    const pesoIdealMaculino = 52 + (0.75 * (altura - 152.4))
    const pesoIdealFeminino = 52 + (0.67 * (altura - 152.4))

    const CalcularIMC = () => {
        let CalculapesoIdealAjustado

        if (sexo === 'm' || sexo === 'M') {
            CalculapesoIdealAjustado = ((peso - pesoIdealMaculino) * 0.25) + pesoIdealMaculino
            setPesoIdeal(`Peso ideal: \n ${pesoIdealMaculino.toFixed(2)} `)
            setPesoIdealAjustado(`Peso Ajustado: \n ${CalculapesoIdealAjustado.toFixed(2)}`)
        } else {
            CalculapesoIdealAjustado = ((peso - pesoIdealFeminino) * 0.25) + pesoIdealFeminino
            setPesoIdeal(`Peso ideal: \n ${pesoIdealFeminino.toFixed(2)} `)
            setPesoIdealAjustado(`Peso Ajustado: \n ${CalculapesoIdealAjustado.toFixed(2)}`)
        }

        setPeso('')
        setAltura('')
        setSexo('')
    }

    return (
        <Container>
            <Title>Calculadora Peso Ideal</Title>

            <Input
                keyboardType="numeric"
                placeholder="Peso (Kg)"
                value={peso}
                onChangeText={text => setPeso(text)}
            />
            <Input
                keyboardType="numeric"
                placeholder="Altura (cm)"
                value={altura}
                onChangeText={text => setAltura(text)}
            />
            <Input
                keyboardType="characters"
                placeholder="Sexo (m/f)"
                value={sexo}
                onChangeText={text => setSexo(text)}
            />

            <Botao onPress={CalcularIMC}>
                <TextoBotao>Calcular</TextoBotao>
            </Botao>
            
            <MensagemResultado>{pesoIdeal}</MensagemResultado>
            <MensagemResultado>{pesoIdealAjustado}</MensagemResultado>

        </Container>
    )
}

export default CalculadoraPesoIdeal