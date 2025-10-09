import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

export default function Estagio2() {
  return (
    <View style={styles.container}>
      <Text style={styles.nome}>VITINHO</Text>
      <Text style={styles.charada}>
        Onde o fogo brande, sem que haja{'\n'}
        tumulto, guardado a muitas{'\n'}
        chaves, elementos ocultos.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#8B3A3A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
    width: '100%',
  },
  nome: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
    fontFamily: 'serif', // Troque para a fonte desejada
    marginBottom: 8,
    letterSpacing: 1,
  },
  charada: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    lineHeight: 32,
  },
});