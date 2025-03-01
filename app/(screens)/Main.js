import { Link } from "expo-router";
import React from "react";
import {
  Text,
  TouchableOpacity,
  View,
  StyleSheet,
  SafeAreaView,
} from "react-native";

const MainScreen = ({ navigation }) => {
  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.content}>
          <Link href="Camera" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Chụp ảnh</Text>
            </TouchableOpacity>
          </Link>
          <Link href="Library" asChild>
            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>Chọn ảnh</Text>
            </TouchableOpacity>
          </Link>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#121212",
  },
  container: {
    flex: 1,
    backgroundColor: "#121212",
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  backButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  backButtonText: {
    color: "#ffffff",
    fontSize: 35,
    marginLeft: 8,
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  actionButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "100%",
    height: "20%",
    alignItems: "center",
    justifyContent: "center",
  },
  actionButtonText: {
    color: "#ffffff",
    fontSize: 35,
    fontWeight: "bold",
  },
});

export default MainScreen;
