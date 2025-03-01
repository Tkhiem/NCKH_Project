import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  Alert,
  Image,
} from "react-native";
import * as Camera from "expo-camera";
import * as ImagePicker from "expo-image-picker";

const API_URL = "https://imagecaption-nckh.onrender.com/"; // Thay bằng API của bạn

const HomeScreen = () => {
  const [hasPermission, setHasPermission] = useState(null);
  const [photo, setPhoto] = useState(null);
  const [camera, setCamera] = useState(null);

  useEffect(() => {
    const getPermissions = async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      const libraryStatus =
        await ImagePicker.requestMediaLibraryPermissionsAsync();
      setHasPermission(
        status === "granted" && libraryStatus.status === "granted"
      );
    };
    getPermissions();
  }, []);

  const uploadImage = async (imageUri) => {
    const formData = new FormData();
    formData.append("image", {
      uri: imageUri,
      name: "photo.jpg",
      type: "image/jpeg",
    });
    try {
      const response = await fetch(API_URL, {
        method: "POST",
        body: formData,
        headers: { "Content-Type": "multipart/form-data" },
      });
      const result = await response.json();
      Alert.alert("Kết quả", result.caption || "Lỗi xử lý ảnh");
    } catch (error) {
      console.error("Lỗi khi gửi ảnh lên API:", error);
      Alert.alert("Lỗi", "Không thể gửi ảnh lên server.");
    }
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync();
      setPhoto(data.uri);
      uploadImage(data.uri);
    }
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });
    if (!result.canceled) {
      setPhoto(result.assets[0].uri);
      uploadImage(result.assets[0].uri);
    }
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <View style={styles.header}>
          <Text style={styles.headerText}>Ứng dụng sinh chú thích ảnh</Text>
        </View>
        <View style={styles.content}>
          {hasPermission ? (
            <Camera style={styles.camera} ref={(ref) => setCamera(ref)} />
          ) : (
            <Text>Chưa cấp quyền sử dụng camera</Text>
          )}
          <TouchableOpacity style={styles.button} onPress={takePicture}>
            <Text style={styles.buttonText}>Chụp ảnh</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={pickImage}>
            <Text style={styles.buttonText}>Chọn ảnh</Text>
          </TouchableOpacity>
          {photo && (
            <Image
              source={{ uri: photo }}
              style={{ width: 224, height: 224, marginTop: 20 }}
            />
          )}
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
    alignItems: "center",
    borderBottomWidth: 1,
    borderBottomColor: "#333",
  },
  headerText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#ffffff",
  },
  content: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 20,
  },
  camera: {
    width: 300,
    height: 400,
    marginBottom: 20,
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    marginVertical: 10,
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  buttonText: {
    color: "#ffffff",
    fontSize: 35,
    fontWeight: "bold",
  },
});

export default HomeScreen;
