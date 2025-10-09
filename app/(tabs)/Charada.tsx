import React, { useEffect, useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import Estagio2 from '../(tabs)/components/Estagio2';

// Componente Compass desenhado no código
const Compass = () => (
  <View style={styles.compassContainer}>
    <View style={styles.circle}>
      <View style={styles.arrow} />
      <View style={styles.arrowTip} />
    </View>
  </View>
);

export default function Charada() {
  const [showHelp, setShowHelp] = useState(false);
  const [showCompass, setShowCompass] = useState(false);

  useEffect(() => {
    // Mostra o botão Help após 10 minutos (600000 ms)
    const helpTimer = setTimeout(() => setShowHelp(true), 600000);

    return () => clearTimeout(helpTimer);
  }, []);

  const handleHelp = () => {
    setShowCompass(true);
    setShowHelp(false);
    // Esconde a bússola após 5 minutos (300000 ms)
    setTimeout(() => setShowCompass(false), 300000);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.estagio}>ESTÁGIO 2</Text>
      <View style={styles.personagemContainer}>
        <Image
          source={require('../../assets/images/vitinho.webp')}
          style={styles.avatar}
        />
        <View style={{ flex: 1 }}>
          <Estagio2 />
        </View>
      </View>
      <View style={styles.central}>
        {!showCompass ? (
          <Image
            source={require('../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        ) : (
          <Compass />
        )}
      </View>
      <View style={styles.coordsBox}>
        <Text style={styles.coordsText}>Latitude:</Text>
        <Text style={styles.coordsText}>Longitude:</Text>
      </View>
      <TouchableOpacity style={styles.localBtn}>
        <Text style={styles.localBtnText}>Cheguei ao Local</Text>
      </TouchableOpacity>
      {showHelp && !showCompass && (
        <TouchableOpacity style={styles.helpBtn} onPress={handleHelp}>
          <Text style={styles.helpBtnText}>Help</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C6C6C',
    padding: 16,
  },
  estagio: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
  },
  personagemContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 12,
  },
  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  falaContainer: {
    backgroundColor: '#B03A1A',
    borderRadius: 10,
    padding: 10,
    maxWidth: '80%',
  },
  falaTexto: {
    color: '#fff',
    fontSize: 14,
  },
  central: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    minHeight: 120,
  },
  logo: {
    width: 180,
    height: 80,
  },
  compassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 120,
    height: 120,
  },
  circle: {
    width: 110,
    height: 110,
    borderRadius: 55,
    borderWidth: 4,
    borderColor: '#222',
    backgroundColor: '#e6d3a3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrow: {
    width: 60,
    height: 6,
    backgroundColor: '#B03A1A',
    position: 'absolute',
    top: 52,
    left: 25,
    borderRadius: 3,
    transform: [{ rotate: '0deg' }], // 0deg aponta para a direita
  },
  arrowTip: {
    width: 0,
    height: 0,
    borderLeftWidth: 12,
    borderLeftColor: '#B03A1A',
    borderTopWidth: 6,
    borderTopColor: 'transparent',
    borderBottomWidth: 6,
    borderBottomColor: 'transparent',
    position: 'absolute',
    top: 46,
    left: 80,
    transform: [{ rotate: '0deg' }],
  },
  coordsBox: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
  },
  coordsText: {
    color: '#E6D3A3',
    fontSize: 16,
    marginBottom: 2,
  },
  localBtn: {
    backgroundColor: '#222',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 8,
  },
  localBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  helpBtn: {
    backgroundColor: '#B03A1A',
    borderRadius: 20,
    paddingVertical: 8,
    alignItems: 'center',
    marginTop: 8,
  },
  helpBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});