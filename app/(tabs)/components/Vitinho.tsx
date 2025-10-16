import React from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from "react-native";
// IMPORTANTE: Adiciona useLocalSearchParams para ler parâmetros de rota
import { router, useLocalSearchParams } from "expo-router"; 

export default function Historia() {
  // Usa o hook para ler os parâmetros da URL.
  const params = useLocalSearchParams(); 
  
  // Acessa o parâmetro 'nome'. Se for nulo ou indefinido, usa 'Visitante' como padrão.
  const nomeDoJogador = params.nome || 'Visitante';

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
        {/* Linha adaptada para incluir o nome do jogador */}
        <Text style={styles.titulo}>Olá {nomeDoJogador}, pronto para essa busca?</Text> 
        <Text style={styles.texto}>
          Em 2013, quando a Escola SESI de Osvaldo Cruz ainda estava em
          construção, a região em volta era pouco movimentada. Muitos moradores
          lembram de um menino que vivia nas proximidades da obra e que passava
          horas explorando o terreno. Ele se chamava Vitinho, tinha apenas 8
          anos, e era conhecido por sua curiosidade e pela mania de brincar
          perto dos trabalhadores.
          {"\n\n"}O local era perigoso. O terreno havia sido de um antigo sítio,
          e para erguer o novo prédio foi preciso abrir uma grande escavação
          para assentar os alicerces. Entre máquinas, entulhos e o enorme
          buraco, não era lugar para uma criança.
          {"\n\n"}
          Certa tarde, enquanto os trabalhadores estavam distraídos, Vitinho se
          aproximou demais da borda da construção. Um descuido… e ele caiu. O
          impacto foi fatal. A tragédia marcou a cidade, mas o assunto foi
          abafado para não prejudicar a obra e a inauguração da escola.
          {"\n\n"}
          Com o tempo, começaram os rumores. Alguns funcionários noturnos
          afirmaram ouvir passos apressados no pátio vazio, como se uma criança
          ainda corresse por ali. Estudantes contam que já ouviram risadas
          baixas e distantes quando estavam sozinhos. Outros juram ter visto,
          pela janela, a silhueta de um menino parado no escuro, observando em
          silêncio.
          {"\n\n"}
          Ninguém nunca conseguiu provar nada, mas a história continua viva.
          Muitos acreditam que a alma de Vitinho vagueia pela escola quando a
          noite cai, preso para sempre ao lugar onde sua vida terminou.
          {"\n\n"}
        </Text>
      </ScrollView>
      <TouchableOpacity
        style={styles.botao}
        onPress={() => router.navigate("/(tabs)/components/Estagio2")}
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