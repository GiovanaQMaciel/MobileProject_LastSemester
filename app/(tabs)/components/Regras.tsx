import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";

export default function Historia() {
  const name = "VITINHO";

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../../assets/images/logo.png")}
          style={styles.logo}
          resizeMode="contain"
        />
      </View>
      <Text style={styles.descricao}>QUEM É VITINHO?</Text>
      <ScrollView
        style={styles.textBox}
        contentContainerStyle={{ paddingBottom: 24 }}
      >
        <Text style={styles.titulo}>Olá {name}, pronto para essa busca?</Text>
        <Text style={styles.texto}>
          Funcionamento do Jogo:
          {"\n\n"}
          Você está preso na escola. O fantasma Vitinho lhe dará charadas que
          apontam para diferentes locais da escola. Sua missão é decifrar os
          enigmas, encontrar os lugares corretos e validar cada etapa com uma
          fotografia.
          {"\n\n"}
          Cada acerto revelará a próxima charada, aproximando você da chave que
          abrirá a saída.
          {"\n\n"}
          Regras Básicas:
          {"\n\n"}
          Você sempre começa com uma charada fornecida por Vitinho.
          {"\n\n"}
          Cada acerto revelará a próxima charada, aproximando você da chave que
          abrirá a saída.
          {"\n\n"}
          Tire uma fotografia do que for indicado no
          {"\n\n"}
          Tire uma fotografia do que for indicado no local para validar a
          missão.
          {"\n\n"}
          Após a validação, a próxima charada será liberada. 
          {"\n\n"}
          Se passar 5 minutos sem encontrar o local, você recebe como ajuda um
          mapa e uma bússola.
          {"\n\n"}
          O jogo termina quando você encontrar a chave final e conseguir
          sair da escola. 
          {"\n\n"}
        </Text>
        F
      </ScrollView>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.navigate("/(tabs)/components/Regras")}
      >
        <Text style={styles.botaoTexto}>Voltar ao Jogo</Text>
      </TouchableOpacity>
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
});
