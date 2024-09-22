// src/components/NutrientItem.js
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const NutrientItem = ({ name, value }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}:</Text>
      <Text style={styles.value}>{value}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    marginVertical: 5
  },
  name: {
    flex: 1,
    fontWeight: 'bold'
  },
  value: {
    flex: 1
  }
});

export default NutrientItem;
