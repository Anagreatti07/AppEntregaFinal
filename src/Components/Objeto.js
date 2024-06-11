import { View, Text, StyleSheet, Image, Button, Alert } from 'react-native';
import React, { useState } from 'react';

const logError = (message, error) => {
    console.error(message, error);
    Alert.alert('Erro', message);
};

export default function Objeto({ objetoId, objetoNome, objetoFoto, objetoCor, objetoObservacao, objetoLocalDesaparecimento, objetoDtDesaparecimento, objetoDtEncontro }) {
    const [detalhes, setDetalhes] = useState(null);

    const toggleDetalhes = async () => {
        if (detalhes) {
            setDetalhes(null);
        } else {
            try {
                const response = await fetch(`http://10.139.75.22:5251/api/Objetos/GetAllObjetos`);
                if (!response.ok) {
                    throw new Error(`HTTP status ${response.status}`);
                }
                const data = await response.json();
                setDetalhes(data);
            } catch (error) {
                logError('Não foi possível carregar os detalhes', error);
            }
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
            </View>
            <Button title="Detalhes" onPress={toggleDetalhes} />

            {detalhes && (
                <View style={css.detailsBox}>
                    <Text style={css.detailsText}>Cor: {objetoCor}</Text>
                    <Text style={css.detailsText}>Observação: {objetoObservacao}</Text>
                    <Text style={css.detailsText}>Local de Desaparecimento: {objetoLocalDesaparecimento}</Text>
                    <Text style={css.detailsText}>Data de Desaparecimento: {objetoDtDesaparecimento}</Text>
                    <Text style={css.detailsText}>Data de Encontro: {objetoDtEncontro}</Text>
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
    boxTitle: {
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "flex-start",
        alignItems: "center",
        marginBottom: 10,
        paddingLeft: 5
    },
    circleAvatar: {
        width: 30,
        height: 30,
        borderRadius: 50,
        backgroundColor: "white",
        marginRight: 10
    },
    title: {
        color: "white",
        textAlign: "center"
    },
    boxImage: {
        width: "100%",
        height: 100
    },
    imagem: {
        width: "100%",
        height: "100%",
        resizeMode: "cover"
    },
    detailsBox: {
        width: "100%",
        padding: 10,
        marginTop: 10,
        backgroundColor: "#333"
    },
    detailsText: {
        color: "white",
        textAlign: "justify",
        marginBottom: 5
    }
});

