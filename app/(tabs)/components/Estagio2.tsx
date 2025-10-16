import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';
import { router } from "expo-router";
import React, { useEffect, useState } from 'react';
import { Animated, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Constantes de Localização do Alvo (A Copa)
const TARGET_LATITUDE = -21.800093;
const TARGET_LONGITUDE = -50.883856;

// Funções de Cálculo (Copiadas do Estagio1)

function getBearingToTarget(userLat: number, userLng: number, targetLat: number, targetLng: number): number {
  const toRad = (deg: number) => deg * Math.PI / 180;
  const toDeg = (rad: number) => rad * 180 / Math.PI;

  const dLon = toRad(targetLng - userLng);
  const lat1 = toRad(userLat);
  const lat2 = toRad(targetLat);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  let bearing = toDeg(Math.atan2(y, x));
  bearing = (bearing + 360) % 360; // Normaliza para 0-360
  return bearing;
}

function getArrowRotationAngle(targetAbsoluteBearing: number, deviceHeading: number): number {
    let relativeTargetDirectionFromDeviceNorth = (targetAbsoluteBearing - deviceHeading + 360) % 360;
    let rotationNeeded = relativeTargetDirectionFromDeviceNorth - 270; // Compensando o estilo inicial (Oeste/270°)
    rotationNeeded = (rotationNeeded + 360) % 360;
    return rotationNeeded;
}

function getDirectionLabel(absoluteBearing: number): string {
  const normalized = (absoluteBearing + 360) % 360;
  if (normalized >= 337.5 || normalized < 22.5) return 'Norte';
  if (normalized >= 22.5 && normalized < 67.5) return 'Nordeste';
  if (normalized >= 67.5 && normalized < 112.5) return 'Leste';
  if (normalized >= 112.5 && normalized < 157.5) return 'Sudeste';
  if (normalized >= 157.5 && normalized < 202.5) return 'Sul';
  if (normalized >= 202.5 && normalized < 247.5) return 'Sudoeste';
  if (normalized >= 247.5 && normalized < 292.5) return 'Oeste';
  return 'Noroeste';
}

// Componente Bússola Funcional
const FunctionalCompass = ({ arrowAngle, directionLabel }) => (
  <View style={styles.compassContainer}>
    <View style={styles.circle}>
      <Animated.View
        style={[
          styles.arrowContainer,
          {
            // Aplica a rotação da seta
            transform: [{ rotate: `${arrowAngle}deg` }], 
          },
        ]}
      >
        <View style={styles.arrow} />
        <View style={styles.arrowTip} />
      </Animated.View>
    </View>
  </View>
);


export default function Charada() {
  const [showHelp, setShowHelp] = useState(false);
  const [showCompass, setShowCompass] = useState(false);
  
  // Estados para a Bússola/GPS
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const charadaAtual = "Onde o fogo brande, sem que haja tumulto, guardado a muitas chaves, elementos ocultos.";

  // Lógica de GPS/Bússola e Tempo
  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | undefined;
    let headingSubscription: Location.LocationSubscription | undefined;
    let accSub: any; // Mantido, mas não usado diretamente para o 'heading'

    const setupLocationAndSensors = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
          setErrorMessage('Permissão de localização não concedida.');
          return;
      }
      
      // Assinatura de Localização (Com correção de lentidão)
      locationSubscription = await Location.watchPositionAsync(
        { 
          accuracy: Location.Accuracy.High, 
          timeInterval: 1000, 
          distanceInterval: 1, 
        },
        (loc) => {
          setLatitude(loc.coords.latitude);
          setLongitude(loc.coords.longitude);
          setErrorMessage(null);
        }
      );

      // Assinatura de Direção (Heading)
      headingSubscription = await Location.watchHeadingAsync((data) => {
        setHeading(data.trueHeading || data.magHeading || 0);
      });
    
      // Assinatura do Acelerômetro
      Accelerometer.setUpdateInterval(500);
      accSub = Accelerometer.addListener(() => {}); // O listener precisa estar ativo para usar o sensor, mesmo que não salve o dado
    };
    
    setupLocationAndSensors();
    
    // Configuração do Timer para o botão Help (10 minutos = 600000 ms)
    const helpTimer = setTimeout(() => setShowHelp(true), 5000); 

    return () => {
      // Limpeza
      locationSubscription && locationSubscription.remove();
      headingSubscription && headingSubscription.remove();
      accSub && accSub.remove();
      clearTimeout(helpTimer);
    };
  }, []);

  const handleHelp = () => {
    setShowCompass(true);
    setShowHelp(false);
    // Esconde a bússola após 5 minutos (300000 ms)
    setTimeout(() => setShowCompass(false), 300000); 
  };
  
  // Lógica de cálculo da Bússola
  let targetAbsoluteBearing = 0;
  if (latitude !== null && longitude !== null) {
    targetAbsoluteBearing = getBearingToTarget(latitude, longitude, TARGET_LATITUDE, TARGET_LONGITUDE);
  }

  const arrowAngle = getArrowRotationAngle(targetAbsoluteBearing, heading);
  const directionLabel = getDirectionLabel(targetAbsoluteBearing);

  return (
    <View style={styles.container}>
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}
      
      <Text style={styles.estagio}>ESTÁGIO 2</Text>
      <View style={styles.personagemContainer}>
        <Image
          source={require('../../../assets/images/vitinho.png')}
          style={styles.avatar}
        />
        <View style={styles.charadaBox}> 
          <Text style={styles.nome}>VITINHO</Text>
          <Text style={styles.charadaText}>{charadaAtual}</Text>
        </View>
      </View>
      <View style={styles.central}>
        {!showCompass ? (
          <Image
            source={require('../../../assets/images/logo.png')}
            style={styles.logo}
            resizeMode="contain"
          />
        ) : (
          // SUBSTITUIÇÃO: Usa o componente funcional da bússola
          <FunctionalCompass arrowAngle={arrowAngle} directionLabel={directionLabel} />
        )}
      </View>
      <View style={styles.coordsBox}>
        <Text style={styles.coordsText}>Latitude: <Text style={{ color: '#E6D3A3' }}>{latitude ? latitude.toFixed(6) : '--'}</Text></Text>
        <Text style={styles.coordsText}>Longitude: <Text style={{ color: '#E6D3A3' }}>{longitude ? longitude.toFixed(6) : '--'}</Text></Text>
      </View>
      <TouchableOpacity style={styles.localBtn}>
        <Text style={styles.localBtnText} onPress={() => {router.navigate("/(tabs)/Foto")}}>Cheguei ao Local</Text>
      </TouchableOpacity>
      {showHelp && !showCompass && (
        <TouchableOpacity style={styles.helpBtn} onPress={handleHelp}>
          <Text style={styles.helpBtnText}>Help</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

// Estilos
const newStyles = StyleSheet.create({
  charadaBox: {
    backgroundColor: '#8B3A3A',
    borderRadius: 12,
    padding: 16,
    alignItems: 'flex-start',
    flex: 1, 
  },
  nome: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 28,
    fontFamily: 'serif', 
    marginBottom: 8,
    letterSpacing: 1,
  },
  charadaText: {
    color: '#fff',
    fontSize: 17,
    fontWeight: 'bold',
    lineHeight: 32,
  },
  directionText: { // Adicionado para a bússola
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  errorText: {
    color: 'yellow',
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 10,
    padding: 8,
    backgroundColor: '#8B3A3A',
    borderRadius: 5,
    width: '100%',
  },
});

const styles = StyleSheet.create({
  ...newStyles, 
  container: {
    flex: 1,
    backgroundColor: '#6C6C6C', 
    padding: 25,
  },
  estagio: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#222', 
    alignSelf: 'flex-start', 
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
    backgroundColor: '#333', 
  },
  central: {
    flex: 1, 
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    minHeight: 120, 
  },
  logo: {
    width: 250,
    height: 150,
  },
  compassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 200,
    height: 200,
  },
  circle: {
    width: 180,
    height: 180,
    borderRadius: 90,
    borderWidth: 6,
    borderColor: '#222',
    backgroundColor: '#e6d3a3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  arrowContainer: {
    width: 150,
    height: 150,
    position: 'absolute',
    top: 0,
    left: 0,
  },
  arrow: {
    width: 80,
    height: 8,
    backgroundColor: '#B03A1A',
    position: 'absolute',
    top: 71, 
    left: 35, 
    transform: [{ rotate: '180deg' }], 
  },
  arrowTip: {
    width: 0,
    height: 0,
    borderRightWidth: 18, 
    borderRightColor: '#B03A1A',
    borderTopWidth: 9,
    borderTopColor: 'transparent',
    borderBottomWidth: 9,
    borderBottomColor: 'transparent',
    position: 'absolute',
    top: 66, 
    left: 17, 
  },
  coordsBox: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    width: '100%', // Ajustado para 100% para ocupar toda a largura
  },
  coordsText: {
    color: '#fff',
    fontSize: 16,
    marginBottom: 2,
    fontWeight: 'bold',
  },
  localBtn: {
    backgroundColor: '#222',
    borderRadius: 20,
    paddingVertical: 10,
    alignItems: 'center',
    marginBottom: 8,
    width: '100%', // Ajustado para 100%
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
    alignSelf: 'center', 
    width: '50%', 
  },
  helpBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
});