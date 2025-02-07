// /components/ZoomImage.tsx
import React from 'react';
import { Image, StyleSheet } from 'react-native';
import * as Animatable from 'react-native-animatable';

interface ZoomImageProps {
  url: string;
}

const ZoomImage: React.FC<ZoomImageProps> = ({ url }) => {
  return (
    <Animatable.Image
      source={{ uri: url }}
      style={styles.image}
      animation="zoomIn"
      duration={1000} // Durée de l'animation
    />
  );
};

const styles = StyleSheet.create({
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
});

export default ZoomImage;