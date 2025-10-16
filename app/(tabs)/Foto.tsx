import React, { useRef, useState, useEffect } from "react";
import {
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from "react-native";
import { CameraView, Camera } from "expo-camera"; 
import { useRouter } from "expo-router"; // <-- 1. Importa o roteador

export default function CameraScreen() {
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [photo, setPhoto] = useState<string | null>(null); // Foto em pré-visualização
  const [facing, setFacing] = useState<"front" | "back">("back");
  const cameraRef = useRef<CameraView>(null);
  const router = useRouter(); // <-- 1. Inicializa o roteador

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync(); 
      setHasPermission(status === "granted");
    })();
  }, []);

  const takePicture = async () => {
    if (cameraRef.current) {
      const data = await cameraRef.current.takePictureAsync();
      setPhoto(data.uri); 
    }
  };

  const retakePhoto = () => {
    setPhoto(null); 
  };
  
  // 3. Removemos o bloco 'if (confirmedPhoto)'

  if (hasPermission === null) return <View />;
  if (hasPermission === false)
    return <Text style={styles.noPermission}>Sem acesso à câmera</Text>;

  return (
    <View style={styles.container}>
      <Text style={photo ? styles.previewTitle : styles.title}>
        {photo
          ? 'Pré-visualização: Refaça ou Confirme'
          : 'Será que você chegou ao destino?\nRegistre com uma foto do escorregador do parquinho descoberto!'}
      </Text>

      <View style={styles.cameraContainer}>
        {!photo ? (
          <CameraView style={styles.camera} ref={cameraRef} facing={facing} ratio="1:1" /> 
        ) : (
          <Image source={{ uri: photo }} style={styles.previewImage} />
        )}
      </View>

      <View style={styles.buttonRow}>
        {!photo ? (
          <TouchableOpacity 
            style={styles.captureButton} 
            onPress={takePicture}
          >
            <Text style={styles.captureIcon}>📸</Text>
          </TouchableOpacity>
        ) : (
          <>
            <TouchableOpacity 
              style={[styles.actionButton, styles.retakeButton]} 
              onPress={retakePhoto}
            >
              <Text style={styles.actionText}> Refazer</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.actionButton, styles.confirmButton]} 
              onPress={() => router.navigate("/(tabs)/components/Estagio3")}
            >
              <Text style={styles.actionText}> Confirmar</Text>
            </TouchableOpacity>
          </>
        )}
      </View>
    </View>
  );
}

// --- Estilos ---

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fafafa',
    alignItems: 'center',
    // 2. ALTERAÇÃO PARA CENTRALIZAR VERTICALMENTE:
    justifyContent: 'center', 
    paddingTop: 0, // Removendo padding superior
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 20,
   
  },
  previewTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: '#222',
    textAlign: 'center',
    marginHorizontal: 20,
    marginBottom: 10,
  },
  cameraContainer: {
    width: 300, 
    height: 300, 
    backgroundColor: '#e0e0e0',
    borderRadius: 18,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 40, 
  },
  camera: {
    width: '100%',
    height: '100%',
  },
  previewImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
    resizeMode: 'cover',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '80%',
  },
  captureButton: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 3,
    borderColor: '#bbb',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 5,
  },
  captureIcon: {
    fontSize: 32,
    color: '#888',
  },
  actionButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 10,
    minWidth: 120,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  retakeButton: {
    backgroundColor: '#ff4d4d',
  },
  confirmButton: {
    backgroundColor: '#4CAF50',
  },
  actionText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  noPermission: {
    fontSize: 16,
    color: '#ff3333',
    textAlign: 'center',
    marginTop: 40,
    marginHorizontal: 20,
  },
});