// /components/DownloadButton.tsx
import React from 'react';
import { Button, Alert } from 'react-native';
import * as FileSystem from 'expo-file-system';

interface DownloadButtonProps {
  url: string;
}

const DownloadButton: React.FC<DownloadButtonProps> = ({ url }) => {
  const downloadImage = async () => {
    try {
      // Définir le chemin local où l'image sera téléchargée
      const fileUri = FileSystem.documentDirectory + 'downloaded_image.webp';

      // Télécharger l'image
      const downloadResult = await FileSystem.downloadAsync(url, fileUri);

      if (downloadResult.status === 200) {
        Alert.alert('Succès', 'Image téléchargée avec succès !');
      } else {
        Alert.alert('Erreur', 'Échec du téléchargement.');
      }
    } catch (error) {
      Alert.alert('Erreur', 'Une erreur est survenue lors du téléchargement.');
    }
  };

  return (
    <Button title="Télécharger l'image" onPress={downloadImage} />
  );
};

export default DownloadButton;