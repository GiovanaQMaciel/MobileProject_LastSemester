import React from 'react';
import { StyleSheet, TouchableWithoutFeedback, Image, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  BoasVindas: undefined;
  Home: { nome: string };
};

export default function Capa() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();

  const handlePress = () => {
    navigation.navigate('BoasVindas');
  };

  return (
    <TouchableWithoutFeedback onPress={handlePress}>
      <View style={styles.container}>
        <Image
          source={require('../../assets/images/capa.png')}
          style={styles.imagem}
          resizeMode="cover"
        />
      </View>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagem: {
    width: '100%',
    height: '100%',
  },
});