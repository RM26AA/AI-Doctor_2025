import React from "react";
import { View, Text, Image, StyleSheet, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { MotiView, MotiText } from "moti";

export default function SplashScreen({ navigation }) {
  return (
    <LinearGradient colors={["#ffffff", "#008080"]} style={styles.container}>
      {/* Profile Image Animation */}
      <MotiView
        from={{ opacity: 0, translateY: -50 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: "timing", duration: 1200 }}
        style={styles.imageContainer}
      >
        <Image source={require("../assets/profile-1.PNG")} style={styles.image} />
      </MotiView>

      {/* Intro Text Animation */}
      <MotiText
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ delay: 600, duration: 800 }}
        style={styles.text}
      >
        Hi, I'm Dr. Jenny, your virtual Doctor.
      </MotiText>

      {/* Button Animation */}
      <MotiView
        from={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 1200, duration: 500 }}
      >
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate("Home")}
        >
          <Text style={styles.buttonText}>Let's talk</Text>
        </TouchableOpacity>
      </MotiView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 3,
    borderColor: "#fff",
  },
  text: {
    fontSize: 20,
    fontWeight: "600",
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    fontFamily: "Calibri", // this works only if installed on system
  },
  button: {
    backgroundColor: "#fff",
    paddingVertical: 12,
    paddingHorizontal: 40,
    borderRadius: 30,
    elevation: 3,
  },
  buttonText: {
    fontSize: 18,
    color: "#008080",
    fontWeight: "bold",
    fontFamily: "Calibri",
  },
});

