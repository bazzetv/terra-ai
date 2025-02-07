import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { generateImage, monitorGeneration } from '../utils/api';
import ProgressBarComponent from '../components/ProgressBar';
import LoadingIndicator from '../components/LoadingIndicator';
import ErrorMessage from '../components/ErrorMessage';
import ImageDisplay from '../components/ImageDisplay';
import DownloadButton from '../components/DownloadButton';
import ZoomImage from '../components/ZoomImage';
import { Button } from 'react-native';

const HomeScreen = () => {
  const [imageUrls, setImageUrls] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [status, setStatus] = useState<string>(''); // Statut de la génération
  const [predictionId, setPredictionId] = useState<string>(''); // ID de la prédiction
  const [progress, setProgress] = useState<number>(0); // Valeur de la progression

  const handleGenerateImage = async () => {
    setLoading(true);
    setStatus('processing');
    setProgress(0); // Réinitialiser la progression

    const prompt = 'Create a high-contrast fitness-focused image with a muscular man performing a bicep curl using a black dumbbell with visible weight markings.';

    try {
      const response = await generateImage(prompt);

      const { id } = response.data;
      setPredictionId(id);

      monitorGeneration(id, setStatus, setImageUrls, setLoading, setProgress); // Passer setProgress à monitorGeneration
    } catch (error) {
      console.error('Erreur lors de la génération de l\'image :', error);
      setLoading(false);
      setStatus('failed');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Générer une image avec un prompt</Text>
      <Button title="Générer l'image" onPress={handleGenerateImage} disabled={loading} />
      
      {loading && <LoadingIndicator />}
      {status === 'failed' && <ErrorMessage message="Erreur lors de la génération de l'image." />}
      
      {/* Afficher la barre de progression */}
      {status === 'processing' && <ProgressBarComponent progress={progress} />}
      
      {/* Afficher les images générées */}
      {imageUrls.length > 0 && status === 'succeeded' && (
        <ScrollView contentContainerStyle={styles.imagePanel}>
          {imageUrls.map((url, index) => (
            <View key={index} style={styles.imageContainer}>
              <ZoomImage url={url} />
              <DownloadButton url={url} />
            </View>
          ))}
        </ScrollView>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
  },
  imagePanel: {
    marginTop: 20,
    width: '100%',
    padding: 10,
    alignItems: 'center',
  },
  imageContainer: {
    marginBottom: 20,
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 10,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
});

export default HomeScreen;