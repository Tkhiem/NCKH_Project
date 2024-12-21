import { Link } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View, Text, StyleSheet, SafeAreaView } from 'react-native';

const HomeScreen = () => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Ứng dụng sinh chú thích ảnh</Text>
        </View>
        <View style={styles.content}>
            <Link href='Main' asChild>
            <TouchableOpacity
            style={styles.button}
          >
            <Text style={styles.buttonText}>Bắt đầu</Text>
          </TouchableOpacity>
            </Link>
          <TouchableOpacity style={styles.button} accessibilityRole="button">
            <Text style={styles.buttonText}>Hướng dẫn</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#121212', // Dark background for better contrast
  },
  container: {
    flex: 1,
    backgroundColor: '#121212',
  },
  header: {
    padding: 20,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#333',
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  content: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: '100%',
    height: '20%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 35,
    fontWeight: 'bold',
  },
});

export default HomeScreen;
