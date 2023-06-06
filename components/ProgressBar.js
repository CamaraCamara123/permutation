import React from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const ProgressBarWithLabel = () => (
  <View style={styles.progressContainer}>
    <View style={styles.progressWrapper}>
      <ActivityIndicator size="small" color="#0000ff" />
      <Text style={styles.progressText}>Loading...</Text>
    </View>
  </View>
);

const styles = StyleSheet.create({
  progressContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressWrapper: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ProgressBarWithLabel;
