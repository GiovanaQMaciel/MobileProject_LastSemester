import { RouteProp } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type HomeProps = {
  route: RouteProp<{ params: { nome: string } }, 'params'>;
};

export default function Home({ route }: HomeProps) {
  const { nome } = route.params || {};

  return (
    <View style={styles.container}>
      <Text style={styles.texto}>Bem-vindo, {nome}!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6C1A1A',
  },
  texto: {
    fontSize: 24,
    color: '#E6D3A3',
    fontWeight: 'bold',
  },
});