import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { router } from "expo-router";


const COPA_LATITUDE = -21.800093;
const COPA_LONGITUDE = -50.883856;

// Funções Auxiliares (mantidas para garantir que estejam no escopo correto)

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


// A função que o motor de erro acusou, está aqui no escopo global
function getArrowRotationAngle(targetAbsoluteBearing: number, deviceHeading: number): number {
    // Calculamos a direção do alvo relativa ao "Norte" do dispositivo (topo da tela).
    let relativeTargetDirectionFromDeviceNorth = (targetAbsoluteBearing - deviceHeading + 360) % 360;

    // A seta aponta para Oeste (270 graus) quando rotate é 0deg.
    // A rotação necessária é (direção_relativa - 270).
    let rotationNeeded = relativeTargetDirectionFromDeviceNorth - 270;

    // Normaliza
    rotationNeeded = (rotationNeeded + 360) % 360;

    return rotationNeeded;
}


/**
 * Retorna um rótulo de direção cardeal com base em um bearing absoluto.
 */
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

export default function Estagio1() {
  const [latitude, setLatitude] = useState<number | null>(null);
  const [longitude, setLongitude] = useState<number | null>(null);
  const [heading, setHeading] = useState<number>(0);
  const [accHeading, setAccHeading] = useState<number | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null); // Para erros de permissão/localização

  useEffect(() => {
    let locationSubscription: Location.LocationSubscription | undefined;
    let headingSubscription: Location.LocationSubscription | undefined;
    let accSub: any;

    const setupLocation = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      
      if (status !== 'granted') {
          setErrorMessage('Permissão de localização não concedida. Por favor, habilite-a nas configurações do seu dispositivo.');
          return;
      }
      
      // Corrigindo a lentidão: Adicionando distanceInterval para forçar atualizações
      locationSubscription = await Location.watchPositionAsync(
        { 
          accuracy: Location.Accuracy.High, 
          timeInterval: 5, // Tenta atualizar a cada 1 segundo (max freq)
          distanceInterval: 0.1, // Força a atualização a cada 1 metro de movimento
        },
        (loc) => {
          setLatitude(loc.coords.latitude);
          setLongitude(loc.coords.longitude);
          setErrorMessage(null); // Limpa o erro se a localização estiver OK
        }
      );

      // Assinatura de Direção (Heading)
      headingSubscription = await Location.watchHeadingAsync((data) => {
        setHeading(data.trueHeading || data.magHeading || 0);
      });
    
      // Assinatura do Acelerômetro (usado para fallback de Heading, se necessário)
      Accelerometer.setUpdateInterval(500);
      accSub = Accelerometer.addListener(accData => {
        const { x, y } = accData;
        const angle = Math.atan2(y, x) * (180 / Math.PI);
        setAccHeading(angle);
      });
    };
    
    setupLocation();

    return () => {
      // Limpeza de todas as assinaturas ao desmontar o componente
      locationSubscription && locationSubscription.remove();
      headingSubscription && headingSubscription.remove();
      accSub && accSub.remove();
    };
  }, []);

  let targetAbsoluteBearing = 0;
  if (latitude !== null && longitude !== null) {
    targetAbsoluteBearing = getBearingToTarget(latitude, longitude, COPA_LATITUDE, COPA_LONGITUDE);
  }

  // Chamada da função garantida no escopo
  const arrowAngle = getArrowRotationAngle(targetAbsoluteBearing, heading);
  const directionLabel = getDirectionLabel(targetAbsoluteBearing);

  return (
    <View style={styles.container}>
      {/* Exibe o erro de permissão ou localização */}
      {errorMessage && <Text style={styles.errorText}>{errorMessage}</Text>}

      <Text style={styles.estagio}>ESTÁGIO 1</Text>
      <Text style={styles.titulo}>VÁ PARA A COPA</Text>
      <Text style={styles.subtitulo}>Inicie a experiência na{'\n'}copa escolar</Text>
      <View style={styles.central}>
        <View style={styles.compassContainer}>
          <View style={styles.circle}>
            <Animated.View
              style={[
                styles.arrowContainer,
                {
                  transform: [{ rotate: `${arrowAngle}deg` }],
                },
              ]}
            >
              <View style={styles.arrow} />
              <View style={styles.arrowTip} />
            </Animated.View>
          </View>
        </View>
        <Text style={styles.directionText}>Apontando para: <Text style={{ fontWeight: 'bold' }}>{directionLabel}</Text></Text>
      </View>
      <View style={styles.coordsBox}>
        <Text style={styles.coordsText}>Latitude: <Text style={{ color: '#E6D3A3' }}>{latitude ? latitude.toFixed(6) : '--'}</Text></Text>
        <Text style={styles.coordsText}>Longitude: <Text style={{ color: '#E6D3A3' }}>{longitude ? longitude.toFixed(6) : '--'}</Text></Text>
      </View>
      <TouchableOpacity style={styles.localBtn} onPress={() => router.navigate('(tabs)/components/Historia2')}>
        <Text style={styles.localBtnText}>Cheguei ao Local</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6C6C6C',
    padding: 16,
    alignItems: 'center',
  },
  estagio: {
    fontWeight: 'bold',
    fontSize: 16,
    marginBottom: 8,
    color: '#222',
    alignSelf: 'flex-start',
  },
  titulo: {
    fontFamily: 'serif',
    fontWeight: 'bold',
    fontSize: 35,
    color: '#fff',
    marginTop: 25,
    marginBottom: 8,
    alignSelf: 'center',
    letterSpacing: 2,
  },
  subtitulo: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center',
    marginBottom: 16,
    fontWeight: 'bold',
  },
  central: {
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 24,
    minHeight: 120,
  },
  compassContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 160,
    height: 160,
  },
  circle: {
    width: 150,
    height: 150,
    borderRadius: 75,
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
    top: 71, // 75 (meio) - 4 (meia altura) = 71
    left: 35, // 75 (meio) - 40 (meia largura) = 35. Centraliza (150/2 - 80/2 = 35).
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
  directionText: {
    color: '#fff',
    fontSize: 16,
    marginTop: 12,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  coordsBox: {
    backgroundColor: '#000',
    borderRadius: 12,
    padding: 12,
    marginBottom: 12,
    width: '90%',
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
    width: '90%',
  },
  localBtnText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
    fontStyle: 'italic',
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