// NutritionDetails.js
import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const NutritionDetails = ({ route }) => {
  const { scan } = route.params;

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>{scan.productName}</Text>
      <Text style={styles.brand}>Brand: {scan.brand}</Text>
      <Text style={styles.section}>Serving Size: {scan.servingSize}</Text>
      <Text style={styles.section}>Total Carbohydrates: {scan.totalCarbs}g</Text>
      <Text style={styles.section}>Nutrients:</Text>
      {Object.entries(scan.nutrients).map(([key, value]) => (
        <Text key={key} style={styles.nutrient}>
          {key}: {value}
        </Text>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  brand: {
    fontSize: 18,
    marginVertical: 10,
  },
  section: {
    fontSize: 18,
    marginTop: 15,
  },
  nutrient: {
    fontSize: 16,
    marginLeft: 10,
  },
});

export default NutritionDetails;
