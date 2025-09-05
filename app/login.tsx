import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Alert } from "react-native";
import * as WebBrowser from "expo-web-browser";
import * as Linking from "expo-linking";
import AsyncStorage from "@react-native-async-storage/async-storage";

const API_BASE = "https://ticketing.development.atelier.ovh/api/mobile";

export default function LoginScreen() {
  useEffect(() => {
    const sub = Linking.addEventListener("url", async (event) => {
      const url = event.url;
      const tokenMatch = url.match(/[?&]token=([^&]+)/);
      if (tokenMatch) {
        const token = decodeURIComponent(tokenMatch[1]);
        await AsyncStorage.setItem("token", token);
        Alert.alert("Succès", "Connexion réussie !");
        // TODO: navigation vers dashboard
      }
    });

    return () => sub.remove();
  }, []);

  const startGoogleOAuth = async () => {
    try {
      const res = await fetch(`${API_BASE}/auth/google/url`);
      if (!res.ok) throw new Error("Impossible d'obtenir l’URL Google OAuth2");
      const body = await res.json();
      const authUrl = body.auth_url;
      if (!authUrl) throw new Error("URL d'authentification introuvable");

      // ouvrir dans le navigateur externe
      await WebBrowser.openBrowserAsync(authUrl);
    } catch (err: any) {
      Alert.alert("Erreur", err.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Connexion</Text>
      <TouchableOpacity style={styles.button} onPress={startGoogleOAuth}>
        <Text style={styles.buttonText}>Se connecter avec Google</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#0062ff" },
  title: { fontSize: 26, color: "white", fontWeight: "700", textAlign: "center", marginBottom: 32 },
  button: { backgroundColor: "#000000", padding: 14, borderRadius: 25, alignItems: "center" },
  buttonText: { color: "white", fontSize: 17, fontWeight: "600" },
});
