import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import React, { useState } from 'react';

export default function NovaObservacao({ route, navigation }) {
    const { objetoId } = route.params;
    const [observacaoDescricao, setObservacaoDescricao] = useState('');
    const [observacaoLocal, setObservacaoLocal] = useState('');
    const [observacaoData, setObservacaoData] = useState('');

    const handleSubmit = async () => {
        try {
            const response = await fetch(`http://10.139.75.22:5251/api/Observacoes/GetAllObservacao`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ 
                    objetoId, 
                    usuarioId: 1, // Supondo que o ID do usuário é 1
                    descricao: observacaoDescricao, 
                    local: observacaoLocal, 
                    data: observacaoData 
                })
            });
            if (!response.ok) {
                throw new Error(`HTTP status ${response.status}`);
            }
            Alert.alert('Sucesso', 'Observação adicionada com sucesso!');
            navigation.goBack();
        } catch (error) {
            console.error('Erro ao adicionar observação', error);
            Alert.alert('Erro', 'Não foi possível adicionar a observação');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.label}>Descrição:</Text>
            <TextInput
                style={styles.input}
                value={observacaoDescricao}
                onChangeText={setObservacaoDescricao}
                placeholder="Digite a descrição"
                multiline
            />
            <Text style={styles.label}>Local:</Text>
            <TextInput
                style={styles.input}
                value={observacaoLocal}
                onChangeText={setObservacaoLocal}
                placeholder="Digite o local"
            />
            <Text style={styles.label}>Data:</Text>
            <TextInput
                style={styles.input}
                value={observacaoData}
                onChangeText={setObservacaoData}
                placeholder="Digite a data"
            />
            <Button title="Salvar" onPress={handleSubmit} />
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 20,
        backgroundColor: '#222'
    },
    label: {
        color: 'white',
        fontSize: 16,
        marginBottom: 10
    },
    input: {
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 5,
        marginBottom: 20,
        height: 100,
        textAlignVertical: 'top'
    }
});
