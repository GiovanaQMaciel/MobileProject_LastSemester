// import React from 'react';
// import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
// import { useNavigation } from '@react-navigation/native';
// import Historia1 from '../(tabs)/components/Um';

// export default function Historia() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <View style={styles.card}>
//         <Image
//           source={require('../../assets/images/logo.png')}
//           style={styles.logo}
//           resizeMode="contain"
//         />
//       </View>
//       <Text style={styles.descricao}>DESCRIÇÃO</Text>
//       <ScrollView style={styles.textBox} contentContainerStyle={{ paddingBottom: 24 }}>
//         <Text style={styles.titulo}>Quinta-feira, dia 12...</Text>
//         <Historia1 />
//       </ScrollView>
//       <TouchableOpacity style={styles.botao} onPress={() => navigation.navigate('Estagio1')}>
//         <Text style={styles.botaoTexto}>Próxima</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ededed',
//     alignItems: 'center',
//     paddingTop: 16,
//   },
//   card: {
//     width: '90%',
//     height: 120,
//     backgroundColor: '#8B3A3A',
//     borderRadius: 16,
//     alignItems: 'center',
//     justifyContent: 'center',
//     marginBottom: 8,
//     shadowColor: '#000',
//     shadowOpacity: 0.2,
//     shadowRadius: 8,
//     elevation: 4,
//   },
//   logo: {
//     width: '80%',
//     height: '80%',
//   },
//   descricao: {
//     fontWeight: 'bold',
//     fontSize: 16,
//     color: '#444',
//     alignSelf: 'flex-start',
//     marginLeft: '5%',
//     marginBottom: 4,
//     letterSpacing: 1,
//   },
//   textBox: {
//     width: '90%',
//     backgroundColor: '#fff',
//     borderRadius: 16,
//     padding: 16,
//     maxHeight: 320,
//     marginBottom: 16,
//     elevation: 2,
//   },
//   titulo: {
//     fontSize: 22,
//     fontWeight: 'bold',
//     fontFamily: 'serif',
//     textAlign: 'center',
//     marginBottom: 12,
//   },
//   botao: {
//     width: '90%',
//     backgroundColor: '#222',
//     borderRadius: 20,
//     paddingVertical: 12,
//     alignItems: 'center',
//     marginBottom: 16,
//   },
//   botaoTexto: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//   },
// });