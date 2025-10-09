// import React from 'react';
// import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
// import { useNavigation } from '@react-navigation/native';

// export default function Perdeu() {
//   const navigation = useNavigation();

//   return (
//     <View style={styles.container}>
//       <View style={styles.topBox}>
//         <Text style={styles.topTitle}>SEU TEMPO ACABOU!</Text>
//         <Text style={styles.topSubtitle}>Restam: 00:00 horas</Text>
//       </View>
//       <Text style={styles.info}>
//         Vitinho te alcançou... a chave ficou para trás.{"\n"}
//         Clique no botão abaixo para tentar escapar novamente.
//       </Text>
//       <Image
//         source={require('../../assets/images/perdeu.png')}
//         style={styles.img}
//         resizeMode="contain"
//       />
//       <TouchableOpacity style={styles.btn} onPress={() => navigation.navigate('Capa')}>
//         <Text style={styles.btnText}>REINICIAR</Text>
//       </TouchableOpacity>
//     </View>
//   );
// }

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#6C1A1A',
//     alignItems: 'center',
//     justifyContent: 'flex-start',
//     paddingTop: 40,
//   },
//   topBox: {
//     backgroundColor: '#B03A1A',
//     borderRadius: 16,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     marginBottom: 24,
//     alignItems: 'center',
//   },
//   topTitle: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 22,
//     fontFamily: 'serif',
//     letterSpacing: 1,
//     marginBottom: 4,
//   },
//   topSubtitle: {
//     color: '#fff',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
//   info: {
//     color: '#fff',
//     fontSize: 18,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 24,
//     marginHorizontal: 16,
//   },
//   img: {
//     width: 180,
//     height: 180,
//     marginBottom: 32,
//   },
//   btn: {
//     backgroundColor: '#222',
//     borderRadius: 20,
//     paddingVertical: 12,
//     paddingHorizontal: 40,
//     alignItems: 'center',
//     marginTop: 16,
//   },
//   btnText: {
//     color: '#fff',
//     fontWeight: 'bold',
//     fontSize: 18,
//     fontFamily: 'serif',
//   },
// });