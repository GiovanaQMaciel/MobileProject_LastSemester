import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';
import React, { useEffect, useState } from 'react';
import { Animated, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Coordenadas da copa (usando as do seu código modificado)
const COPA_LATITUDE = -21.800093;
const COPA_LONGITUDE = -50.883856;

/**
 * Calcula o bearing absoluto (0-360 graus) da localização do usuário para a localização do alvo.
 * @param userLat Latitude do usuário.
 * @param userLng Longitude do usuário.
 * @param targetLat Latitude do alvo.
 * @param targetLng Longitude do alvo.
 * @returns O bearing absoluto em graus a partir do Norte (0-360).
 */
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

/**
 * Calcula o ângulo relativo para a seta apontar para o alvo,
 * considerando a direção atual do dispositivo e a orientação visual inicial da seta.
 *
 * @param targetAbsoluteBearing Bearing absoluto para o alvo (0-360 graus).
 * @param deviceHeading Direção absoluta do dispositivo (0-360 graus).
 * @returns O ângulo em graus para a rotação da seta.
 *          Assume que 0 graus de rotação visualmente faz a seta apontar para Leste.
 *          A seta deve apontar para o alvo, relativo ao Norte do dispositivo.
 */
function getArrowRotationAngle(targetAbsoluteBearing: number, deviceHeading: number): number {
    // Calculamos a direção do alvo relativa ao "Norte" do dispositivo (topo da tela).
    // Se o dispositivo aponta para o Norte (heading 0), essa direção relativa é apenas o targetAbsoluteBearing.
    // Se o dispositivo aponta para Leste (heading 90) e o alvo é Norte (bearing 0),
    // a direção relativa do topo da tela é -90 ou 270 graus.
    let relativeTargetDirectionFromDeviceNorth = (targetAbsoluteBearing - deviceHeading + 360) % 360;

    // Agora, ajustamos para a orientação inicial da seta (ela aponta para Leste por padrão quando rotate é 0deg).
    // Para fazer uma seta que aponta para Leste (90deg) apontar para `relativeTargetDirectionFromDeviceNorth`,
    // a rotação necessária é `relativeTargetDirectionFromDeviceNorth - 90`.
    let rotationNeeded = relativeTargetDirectionFromDeviceNorth - 90;

    // Normaliza esta rotação para 0-360 graus para consistência.
    rotationNeeded = (rotationNeeded + 360) % 360;

    return rotationNeeded;
}


/**
 * Retorna um rótulo de direção cardeal com base em um bearing absoluto.
 * @param absoluteBearing O bearing absoluto em graus (0-360) a partir do Norte.
 * @returns Uma string representando a direção cardeal.
 */
function getDirectionLabel(absoluteBearing: number): string {
  const normalized = (absoluteBearing + 360) % 360; // Apenas para garantir que o ângulo seja positivo
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
  const [accHeading, setAccHeading] = useState<number | null>(null); // Não usado para a seta, mas mantido

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
          console.log('Permissão de localização não concedida.');
          return;
      }

      // Monitora mudanças de posição (usando timeInterval para atualizações consistentes)
      // Removido o alert disruptivo.
      const locationSubscription = Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, timeInterval: 1000 }, // Atualiza a cada 1 segundo
        (loc) => {
          setLatitude(loc.coords.latitude);
          setLongitude(loc.coords.longitude);
        }
      );

      // Monitora mudanças de direção (heading)
      const headingSubscription = Location.watchHeadingAsync((data) => {
        setHeading(data.trueHeading || data.magHeading || 0);
      });
    
      // Configuração do Acelerômetro (mantido, embora não diretamente usado para a rotação da seta)
      Accelerometer.setUpdateInterval(500);
      const accSub = Accelerometer.addListener(accData => {
        const { x, y } = accData;
        const angle = Math.atan2(y, x) * (180 / Math.PI);
        setAccHeading(angle);
      });

      // Função de limpeza para remover os listeners quando o componente for desmontado
      return () => {
        locationSubscription.remove();
        headingSubscription.remove();
        accSub && accSub.remove();
      };
    })();
  }, []); // O array de dependências vazio garante que o efeito seja executado apenas uma vez

  // Calcula o bearing absoluto para o alvo
  let targetAbsoluteBearing = 0;
  if (latitude !== null && longitude !== null) {
    targetAbsoluteBearing = getBearingToTarget(latitude, longitude, COPA_LATITUDE, COPA_LONGITUDE);
  }

  // Calcula o ângulo para a seta girar, considerando a direção do dispositivo E o estilo inicial da seta
  const arrowAngle = getArrowRotationAngle(targetAbsoluteBearing, heading);

  // Obtém o rótulo da direção cardeal para o alvo (direção absoluta)
  const directionLabel = getDirectionLabel(targetAbsoluteBearing);

  return (
    <View style={styles.container}>
      <Text style={styles.estagio}>ESTÁGIO 1</Text>
      <Text style={styles.titulo}>VÁ PARA A COPA</Text>
      <Text style={styles.subtitulo}>Inicie a experiência na{'\n'}copa escolar</Text>
      <View style={styles.central}>
        <View style={styles.compassContainer}>
          <View style={styles.circle}>
            <Animated.View
              style={[
                styles.arrow,
                {
                  transform: [{ rotate: `${arrowAngle}deg` }],
                },
              ]}
            />
            <Animated.View
              style={[
                styles.arrowTip,
                {
                  transform: [{ rotate: `${arrowAngle}deg` }],
                },
              ]}
            />
          </View>
        </View>
        <Text style={styles.directionText}>Apontando para: <Text style={{ fontWeight: 'bold' }}>{directionLabel}</Text></Text>
      </View>
      <View style={styles.coordsBox}>
        <Text style={styles.coordsText}>Latitude: <Text style={{ color: '#E6D3A3' }}>{latitude ? latitude.toFixed(6) : '--'}</Text></Text>
        <Text style={styles.coordsText}>Longitude: <Text style={{ color: '#E6D3A3' }}>{longitude ? longitude.toFixed(6) : '--'}</Text></Text>
      </View>
      <TouchableOpacity style={styles.localBtn}>
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
    fontSize: 32,
    color: '#fff',
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
  arrow: {
    width: 80,
    height: 8,
    backgroundColor: '#B03A1A',
    position: 'absolute',
    top: 71,
    left: 35,
    borderRadius: 4,
  },
  arrowTip: {
    width: 0,
    height: 0,
    borderLeftWidth: 18,
    borderLeftColor: '#B03A1A',
    borderTopWidth: 9,
    borderTopColor: 'transparent',
    borderBottomWidth: 9,
    borderBottomColor: 'transparent',
    position: 'absolute',
    top: 66,
    left: 110,
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
});