import {
  View,
  Text,
  ScrollView,
  Linking,
  TouchableOpacity,
  Animated,
} from "react-native";
import { useEffect, useRef, useState } from "react";
import { db } from "../../constants/firebase";
import { onValue, ref } from "firebase/database";
import { Image } from "expo-image";
import styles from "../../assets/styles/home.styles";
import { useAuthStore } from "../../store/authStore";

export default function Index() {
  const { user, isCheckingAuth } = useAuthStore();
  const [statusData, setStatusData] = useState(null);

  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    if (!user || !user.email || isCheckingAuth) return;

    const emailKey = user.email.replace(/\./g, "_");
    const userRef = ref(db, `user/${emailKey}`);

    const unsubscribe = onValue(userRef, (snapshot) => {
      const data = snapshot.val();
      setStatusData(data || null);
    });

    return () => unsubscribe();
  }, [user]);

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 600,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 600,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  if (!user || !statusData) return null;

  const lat = statusData.lat;
  const lng = statusData.lng;
  const locationUrl = `https://maps.google.com/?q=${lat},${lng}`;

  return (
    
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>❤️ SaViour 🚑 </Text>
        <Text style={styles.headerSubtitle}>Monitoring saves a life</Text>
      </View>
      <View style={styles.card}>
        <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
        <Text style={styles.username}>{user.username}</Text>

        <View style={styles.statusBoxContainer}>
          {statusData.accident ? (
            <Animated.View
              style={[
                styles.statusBox,
                {
                  backgroundColor: "#ffcccc",
                  transform: [{ scale: pulseAnim }],
                  opacity: pulseAnim.interpolate({
                    inputRange: [1, 1.05],
                    outputRange: [1, 0.8],
                  }),
                },
              ]}
            >
              <Text style={styles.statusText}>🚨 Accident Detected</Text>
            </Animated.View>
          ) : (
            <View style={[styles.statusBox, { backgroundColor: "#e8f5e9" }]}>
              <Text style={styles.statusText}>🚨 Accident Detected</Text>
            </View>
          )}

          {statusData.drowsy ? (
            <Animated.View
              style={[
                styles.statusBox,
                {
                  backgroundColor: "#fff3cd",
                  transform: [{ scale: pulseAnim }],
                  opacity: pulseAnim.interpolate({
                    inputRange: [1, 1.05],
                    outputRange: [1, 0.8],
                  }),
                },
              ]}
            >
              <Text style={styles.statusText}>😴 Drowsiness Detected</Text>
            </Animated.View>
          ) : (
            <View style={[styles.statusBox, { backgroundColor: "#e8f5e9" }]}>
              <Text style={styles.statusText}>😴 Drowsiness Detected</Text>
            </View>
          )}
        </View>

        <TouchableOpacity
          style={styles.locationButton}
          onPress={() => Linking.openURL(locationUrl)}
        >
          <Text style={styles.locationButtonText}>📍 View Location</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}
