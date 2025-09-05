import { Image } from 'expo-image';
import { Platform, StyleSheet } from 'react-native';

import { HelloWave } from '@/components/HelloWave';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useWindowDimensions } from 'react-native';


export default function HomeScreen() {
  const { width, height } = useWindowDimensions();

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#A1CEDC', dark: '#0062ff' }}
      headerImage={
        <Image
          source={require('@/assets/images/logo_plateforme.png')}
          style={{
            width: width * 0.8,
            height: undefined,
            aspectRatio: 290/178,
            resizeMode: 'contain',
            position: 'absolute',
            bottom: 0,
            left: 0,
          }}
        />
      }>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">La Plateforme</ThemedText>
        <HelloWave />
      </ThemedView>


      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Bienvenue sur notre site</ThemedText>
        <ThemedText>
          Cette application est destinée à la gestion de tickets
          d’incidents/support pour l’école La Plateforme et ses étudiant(e)s.
         
        </ThemedText>
      </ThemedView>

    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
});