import React from 'react';
import { View, Image, Text, StyleSheet } from 'react-native';

interface Props {
  imageUrls: string[];
}

const ImageDisplay: React.FC<Props> = ({ imageUrls }) => {
  return (
    <View style={styles.imagePanel}>
      {imageUrls.map((url, index) => (
        <View key={index} style={styles.imageContainer}>
          <Image source={{ uri: url }} style={styles.image} />
          <Text style={styles.imageText}>Image {index + 1} générée</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  imagePanel: {
    marginTop: 20,
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
  image: {
    width: 300,
    height: 300,
    borderRadius: 10,
  },
  imageText: {
    fontSize: 16,
    color: '#333',
    marginTop: 10,
  },
});

export default ImageDisplay;