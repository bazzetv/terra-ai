import React from 'react';
import { Text, StyleSheet } from 'react-native';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage: React.FC<ErrorMessageProps> = ({ message }) => {
  return <Text style={styles.error}>{message}</Text>;
};

const styles = StyleSheet.create({
  error: {
    color: 'red',
    fontSize: 16,
    marginTop: 10,
  },
});

export default ErrorMessage;