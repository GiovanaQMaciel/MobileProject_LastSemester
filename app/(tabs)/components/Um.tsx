import React from 'react';
import { Text, StyleSheet } from 'react-native';

export default function Um() {
  return (
    <Text style={styles.texto}>
      O relógio marca pouco depois do almoço, e você ainda tem que permanecer no SENAI até as 16h. As horas parecem se arrastar. Seus olhos pesam, o corpo implora por descanso.

      {'\n\n'}
      Cansado demais para prestar atenção em qualquer coisa, durante o horário do café, você decide sumir por um tempo. Caminha até o Laboratório de Física, um lugar silencioso e quase sempre vazio à tarde. Lá dentro, encontra uma mesa, cheia de cabos e ferramentas espalhadas.

      {'\n\n'}
      Sem pensar duas vezes, você se abaixa, se esconde embaixo dela e fecha os olhos. O mundo lá fora desaparece, e o sono chega rápido.

      {'\n\n'}
      Aos poucos você se abre os olhos com as energias renovadas, pronto para voltar à sala de aula e terminar seus estudos, parece que dormiu durante horas.
      Se espreguiça, levanta lentamente e olha para a janela da sala, tendo uma grande surpresa...
      Realmente se passou horas. Olha para o relógio: Já são sete da noite. Não há mais ninguém na escola. Você está sozinho. Começa a pensar nas infinitas coisas que podem te acontecer, mas por um instante lembra que dentro da copa há uma chave na qual você pode abrir as portas e sair da escola.
      Rapidamente, sai do laboratório, passa correndo pelo pátio e entra na copa a procura chave...
    </Text>
  );
}

const styles = StyleSheet.create({
  texto: {
    fontSize: 16,
    color: '#222',
    lineHeight: 24,
    textAlign: 'justify',
  },
});