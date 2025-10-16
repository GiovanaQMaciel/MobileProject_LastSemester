import { router } from "expo-router";
import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

type RootStackParamList = {
  Home: { nome: string };
  BoasVindas: undefined;
};

export default function BoasVindas() {
  const [nome, setNome] = useState('');
  const handleIniciar = () => {
    if (nome.trim().length > 0) {
      router.navigate({ pathname: '/(tabs)/Historia1', params: { nome: nome } });
    } else {
      alert('Por favor, digite seu nome ou apelido.');
    }
  };  

  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>OLÁ, BOAS VINDAS!</Text>
      <Text style={styles.subtitulo}>Como devemos te chamar?</Text>
      <TextInput
        style={styles.input}
        placeholder="Nome ou Apelido"
        value={nome}
        onChangeText={setNome}
        placeholderTextColor="#8B7E66"
      />
      <TouchableOpacity style={styles.botao} onPress={handleIniciar}>
        <Text style={styles.textoBotao}>Iniciar</Text>
      </TouchableOpacity>
      <Text style={styles.logo}>KEEPER OF THE KEY</Text>
    </View>
  );
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C1A1A',
    alignItems: 'center',
    justifyContent: 'center',
  },
  titulo: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#E6D3A3',
    textAlign: 'center',
    marginBottom: 16,
  },
  subtitulo: {
    fontSize: 22,
    color: '#E6D3A3',
    textAlign: 'center',
    marginBottom: 24,
  },
  input: {
    width: 250,
    height: 40,
    backgroundColor: '#E6D3A3',
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    fontSize: 16,
    color: '#6C1A1A',
    borderWidth: 2,
    borderColor: '#8B7E66',
  },
  botao: {
    backgroundColor: '#6C3A1A',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 40,
    marginBottom: 40,
  },
  textoBotao: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
  },
  logo: {
    fontSize: 32,
    color: '#B03A1A',
    fontWeight: 'bold',
    marginTop: 60,
    textAlign: 'center',
    fontFamily: 'serif',
  },
});