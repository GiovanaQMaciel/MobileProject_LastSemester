import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Audio } from "expo-av"; // Importa a biblioteca de áudio

// IMPORTAÇÃO DO ARQUIVO DE ÁUDIO
// ATENÇÃO: Substitua pelo caminho real do seu arquivo de áudio
const audioFile = require("../../../assets/audio/vitinho.wav");
// Se você não tem um arquivo, crie um dummy ou use um path temporário

export default function Historia() {

  // Estados para gerenciar o áudio
  const [sound, setSound] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);

  // 1. Carregar o áudio (useEffect)
  useEffect(() => {
    const loadAudio = async () => {
      setIsLoading(true);
      const { sound } = await Audio.Sound.createAsync(
        audioFile,
        { shouldPlay: false },
        onPlaybackStatusUpdate
      );
      setSound(sound);
      setIsLoading(false);
    };
    loadAudio();
  }, []);

  // 2. Atualizar o estado da reprodução
  const onPlaybackStatusUpdate = (status) => {
    setIsPlaying(status.isPlaying);
    if (status.didJustFinish) {
      setIsPlaying(false);
    }
  };

  // 3. Função para tocar/pausar o áudio
  const playPauseSound = async () => {
    if (isLoading) {
      return; // Não faz nada se ainda estiver carregando
    }
    if (sound) {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        // Volta para o início se terminou
        const status = await sound.getStatusAsync();
        if (status.didJustFinish) {
          await sound.replayAsync();
        } else {
          await sound.playAsync();
        }
      }
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.descricao}>DESCRIÇÃO</Text>
      <ScrollView
        style={styles.textBox}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text style={styles.titulo}>Quinta-feira, dia 12...</Text>
        <Text style={styles.texto}>
          Chegando à copa, você entra com passos apressados, sentindo o eco dos
          seus sapatos ressoando no espaço vazio. Corre até o balcão, abre a
          primeira gaveta com ansiedade e começa a vasculhar. Colheres.
          Guardanapos... Você puxa a gaveta com mais força, olhando até o fundo.
          Nada.
          {"\n\n"}
          Seu coração acelera. A chave não está lá. De repente, o silêncio
          absoluto é rompido por um sussurro gelado, vindo de lugar nenhum — e
          de todos os lugares ao mesmo tempo:
          {"\n\n"}
          <View style={{ width: "100%", alignItems: "center" }}>
            <TouchableOpacity
              style={styles.audioButton}
              onPress={playPauseSound}
            >
              <Text style={styles.audioButtonText}>
                {isPlaying ? "PAUSAR ÁUDIO" : "OUVIR SUSSURO"}
              </Text>
            </TouchableOpacity>
          </View>
          {"\n\n"}
          Então, o Vitinho realmente existe! Aquela velha história que os
          veteranos contavam no corredor, não era apenas uma lenda.
          {"\n\n"}
          Você sente o medo apertar no peito, mas também percebe uma verdade
          cruel: não há outro jeito de sair dali. Se quiser encontrar a chave e
          escapar da escola, terá que jogar o jogo do fantasma.
          {"\n\n"}
          Mesmo com o frio na barriga, você respira fundo, encara o vazio da
          sala e decide seguir as charadas. É o único caminho para sair da
          escola com segurança. A caçada começou.
          {"\n\n"}
        </Text>
        <View style={{ width: "100%", alignItems: "center" }}>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.navigate("Vitinho")}
          >
            <Text style={styles.botaoTexto}>Vamos Começar!</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.botao}
            onPress={() => router.navigate("/(tabs)/components/Vitinho")}
          >
            <Text style={styles.botaoTexto}>Quem é Vitinho?</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#ededed",
    alignItems: "center",
    paddingTop: 16,
    marginTop: 46,
  },
  card: {
    width: "90%",
    height: 120,
    backgroundColor: "#8B3A3A",
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  logo: {
    width: "80%",
    height: "80%",
  },
  descricao: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#444",
    alignSelf: "flex-start",
    marginLeft: "5%",
    marginBottom: 4,
    letterSpacing: 1,
  },
  textBox: {
    width: "90%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 16,
    maxHeight: 500,
    marginBottom: 16,
    elevation: 2,
  },
  titulo: {
    fontSize: 22,
    fontWeight: "bold",
    fontFamily: "serif",
    textAlign: "center",
    marginBottom: 12,
  },
  botao: {
    width: "90%",
    backgroundColor: "#222",
    borderRadius: 20,
    paddingVertical: 12,
    alignItems: "center",
    marginBottom: 16,
  },
  botaoTexto: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 18,
  },
  texto: {
    fontSize: 16,
    color: "#222",
    lineHeight: 24,
    textAlign: "justify",
  },
  // NOVOS ESTILOS PARA O BOTÃO DE ÁUDIO
  audioButton: {
    backgroundColor: "#8B3A3A",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 10,
    marginTop: 8,
    marginBottom: 8,
    alignSelf: "center", // Centraliza o botão dentro do Text/Scrollview
    minWidth: 150,
    alignItems: "center",
    justifyContent: "center",
  },
  audioButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
});
