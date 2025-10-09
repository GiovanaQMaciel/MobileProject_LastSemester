import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import * as Location from 'expo-location';
import { Accelerometer } from 'expo-sensors';

// Coordenadas da copa
const COPA_LATITUDE = -21.7999845;
const COPA_LONGITUDE = -50.8841291;

function getAngleToTarget(userLat: number, userLng: number, targetLat: number, targetLng: number, heading: number) {
  const toRad = (deg: number) => deg * Math.PI / 180;
  const toDeg = (rad: number) => rad * 180 / Math.PI;

  const dLon = toRad(targetLng - userLng);
  const lat1 = toRad(userLat);
  const lat2 = toRad(targetLat);

  const y = Math.sin(dLon) * Math.cos(lat2);
  const x = Math.cos(lat1) * Math.sin(lat2) -
            Math.sin(lat1) * Math.cos(lat2) * Math.cos(dLon);

  let bearing = toDeg(Math.atan2(y, x));
  bearing = (bearing + 360) % 360;

  const angle = bearing - heading;
  return angle;
}

function getDirectionLabel(angle: number) {
  const normalized = (angle + 360) % 360;
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

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') return;

      Location.watchPositionAsync(
        { accuracy: Location.Accuracy.High, distanceInterval: 1 },
        (loc) => {
          setLatitude(loc.coords.latitude);
          setLongitude(loc.coords.longitude);
        }
      );

      Location.watchHeadingAsync((data) => {
        setHeading(data.trueHeading || data.magHeading || 0);
      });
    })();

    // Acelerômetro para maior precisão
    Accelerometer.setUpdateInterval(500);
    const accSub = Accelerometer.addListener(accData => {
      const { x, y } = accData;
      // Calcula ângulo do acelerômetro (em graus)
      const angle = Math.atan2(y, x) * (180 / Math.PI);
      setAccHeading(angle);
    });

    return () => {
      accSub && accSub.remove();
    };
  }, []);

  // Usa heading do GPS, mas pode combinar com acelerômetro se quiser
  let arrowAngle = 0;
  if (latitude !== null && longitude !== null) {
    arrowAngle = getAngleToTarget(latitude, longitude, COPA_LATITUDE, COPA_LONGITUDE, heading);
  }

  const directionLabel = getDirectionLabel(arrowAngle);

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