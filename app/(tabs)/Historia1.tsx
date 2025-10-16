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

  return (
    <View style={styles.container}>
      <View style={styles.card}>
        <Image
          source={require("../../assets/images/logo.png")}
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
          O relógio marca pouco depois do almoço, e você ainda tem que
          permanecer no SENAI até as 16h. As horas parecem se arrastar. Seus
          olhos pesam, o corpo implora por descanso.
          {"\n\n"}
          Cansado demais para prestar atenção em qualquer coisa, durante o
          horário do café, você decide sumir por um tempo. Caminha até o
          Laboratório de Física, um lugar silencioso e quase sempre vazio à
          tarde. Lá dentro, encontra uma mesa, cheia de cabos e ferramentas
          espalhadas.
          {"\n\n"}
          Sem pensar duas vezes, você se abaixa, se esconde embaixo dela e fecha
          os olhos. O mundo lá fora desaparece, e o sono chega rápido.
          {"\n\n"}
          Aos poucos você se abre os olhos com as energias renovadas, pronto
          para voltar à sala de aula e terminar seus estudos, parece que dormiu
          durante horas. Se espreguiça, levanta lentamente e olha para a janela
          da sala, tendo uma grande surpresa... Realmente se passou horas. Olha
          para o relógio: Já são sete da noite. Não há mais ninguém na escola.
          Você está sozinho. Começa a pensar nas infinitas coisas que podem te
          acontecer, mas por um instante lembra que dentro da copa há uma chave
          na qual você pode abrir as portas e sair da escola. Rapidamente, sai
          do laboratório, passa correndo pelo pátio e entra na copa a procura
          chave...
        </Text>
        F
      </ScrollView>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.navigate("/(tabs)/Estagio1")}
      >
        <Text style={styles.botaoTexto}>Próxima</Text>
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
    color: '#222',
    lineHeight: 24,
    textAlign: 'justify',
  },
});
