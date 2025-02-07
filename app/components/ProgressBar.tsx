// /components/ProgressBar.tsx
import React from 'react';
import { StyleSheet } from 'react-native';
import { Bar } from 'react-native-progress'; // Import de la barre de progression

interface ProgressBarProps {
  progress: number;
}

const ProgressBarComponent: React.FC<ProgressBarProps> = ({ progress }) => {
  return (
    <Bar
      progress={progress}
      width={300}
      color="#3498db"
      height={10}
      borderRadius={5}
      style={styles.progressBar}
    />
  );
};

const styles = StyleSheet.create({
  progressBar: {
    marginTop: 20,
  },
});

export default ProgressBarComponent;