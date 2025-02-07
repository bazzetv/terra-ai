import React from 'react';
import { Button, ActivityIndicator, StyleSheet, Text } from 'react-native';

interface Props {
  onPress: () => void;
  loading: boolean;
}

const ImageGenerationButton: React.FC<Props> = ({ onPress, loading }) => {
  return (
    <Button
      title={loading ? "Génération en cours..." : "Générer l'image"}
      onPress={onPress}
      disabled={loading}
    />
  );
};

export default ImageGenerationButton;