import { useRouter } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { useEffect } from "react";

export default function Index() {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const token = await SecureStore.getItemAsync("userToken");
      if (token) {
        router.replace("/home"); // utilisateur connecté → home
      } else {
        router.replace("/login"); // sinon → login 
      }
    };
    checkSession();
  }, []);

  return null; // rien à afficher ici
}