import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, Button, Alert } from 'react-native';
import React, { useState } from 'react';

const logError = (message, error) => {
    console.error(message, error);
    Alert.alert('Erro', message);
};

const logSuccess = (message) => {
    console.log(message);
    Alert.alert('Sucesso', message);
};

export default function Objeto({ objetoId, objetoNome, objetoFoto, objetoCor, objetoObservacao, objetoLocalDesaparecimento, objetoDtDesaparecimento, objetoDtEncontro }) {
    const [mostrarDetalhes, setMostrarDetalhes] = useState(false);
    const [mostrarObservacao, setMostrarObservacao] = useState(false);
    const [descricao, setObservacaoDescricao] = useState('');
    const [local, setObservacaoLocal] = useState('');
    const [data, setObservacaoData] = useState('');

    const toggleDetalhes = () => {
        setMostrarDetalhes(!mostrarDetalhes);
        setMostrarObservacao(false);
    };

    const toggleObservacao = () => {
        setMostrarObservacao(!mostrarObservacao);
        setMostrarDetalhes(false);
    };

    const salvarObservacao = async () => {
        const observacao = {
            descricao: descricao,
            local: local,
            data: data,
            objetoId: objetoId
        };

        try {
            const response = await fetch('http://10.139.75.22:5251/api/Observacoes/UpdateObservacao/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(observacao)
            });

            if (!response.ok) {
                const responseData = await response.text();
                throw new Error(`HTTP status ${response.status} - ${responseData}`);
            }

            logSuccess('Observação salva com sucesso');
            setObservacaoDescricao('');
            setObservacaoLocal('');
            setObservacaoData('');
            setMostrarObservacao(false);
        } catch (error) {
            logError('Não foi possível salvar a observação', error);
        }
    };

    return (
        <View style={css.container}>
            <View style={css.boxTitle}>
                <View style={css.circleAvatar}></View>
                <Text style={css.title}>{objetoNome}</Text>
            </View>
            <View style={css.boxImage}>
                <Image source={{ uri: objetoFoto }} style={css.imagem} />
                <View style={css.btns}>
                    <TouchableOpacity style={css.btnLogin} onPress={toggleDetalhes}>
                        <Text style={css.btnLoginText}>DETALHES</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={css.btnLogin} onPress={toggleObservacao}>
                        <Text style={css.btnLoginText}>OBSERVAÇÃO</Text>
                    </TouchableOpacity>
                </View>
            </View>
            {mostrarDetalhes && (
                <View style={css.detailsBox}>
                    <Text style={css.detailsText}>Cor: {objetoCor}</Text>
                    <Text style={css.detailsText}>Observação: {objetoObservacao}</Text>
                    <Text style={css.detailsText}>Local de Desaparecimento: {objetoLocalDesaparecimento}</Text>
                    <Text style={css.detailsText}>Data de Desaparecimento: {objetoDtDesaparecimento}</Text>
                    <Text style={css.detailsText}>Data de Encontro: {objetoDtEncontro}</Text>
                </View>
            )}
            {mostrarObservacao && (
                <View style={css.observacao}>
                    <TextInput
                        style={css.input}
                        placeholder="Descrição"
                        placeholderTextColor="white"
                        value={descricao}
                        onChangeText={setObservacaoDescricao}
                    />
                    <TextInput
                        style={css.input}
                        placeholder="Local"
                        placeholderTextColor="white"
                        value={local}
                        onChangeText={setObservacaoLocal}
                    />
                    <TextInput
                        style={css.input}
                        placeholder="Data"
                        placeholderTextColor="white"
                        value={data}
                        onChangeText={setObservacaoData}
                    />
                    <Button title="Salvar Observação" onPress={salvarObservacao} />
                </View>
            )}
        </View>
    );
}

const css = StyleSheet.create({
    container: {
        width: "100%",
        height: 600
    },
    btns: {
        flexDirection: "row"
    },
    observacao: {
        width: "100%",
        padding: 10,
        marginTop: 10,
        backgroundColor: "#717165"
    },
    boxTitle: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 15,
        marginTop: 15,
        paddingLeft: 5
    },
    circleAvatar: {
        width: 35,
        height: 35,
        borderRadius: 50,
        backgroundColor: "black",
        marginRight: 10,
    },
    title: {
        color: "black",
        textAlign: "center"
    },
    boxImage: {
        width: "80%",
        height: "80%",
        marginLeft: "10%"
    },
    imagem: {
        width: "100%",
        height: "70%",
        resizeMode: "cover"
    },
    detailsBox: {
        width: "100%",
        padding: 10,
        marginTop: 10,
        backgroundColor: "#717165"
    },
    detailsText: {
        color: "white",
        textAlign: "justify",
        marginBottom: 5
    },
    btnLogin: {
        width: "50%",
        height: 50,
        borderWidth: 1,
        borderRadius: 10,
        marginTop: 10,
        backgroundColor: "#717165"
    },
    btnLoginText: {
        color: "white",
        lineHeight: 45,
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        paddingLeft: 8,
        color: 'white',
        backgroundColor: '#666'
    }
});
