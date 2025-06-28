import {
  View,
  Text,
  Alert,
  FlatList,
  TouchableOpacity,
  RefreshControl,
  TextInput,
} from "react-native";
import React, { useState } from "react";
import { useRouter } from "expo-router";
import { API_URL } from "../../constants/api";
import { useAuthStore } from "../../store/authStore";
import styles from "../../assets/styles/profile.styles";
import ProfileHeader from "../../components/ProfileHeader";
import LogoutButton from "../../components/LogoutButton";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../../constants/colors";
import { useEffect } from "react";
import { Image } from "expo-image";
import Update from "../../components/Update";

const Profile = () => {
  const [relativeMobile, setRelativeMobile] = useState("");

  const [isLoading, setIsLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const { token } = useAuthStore();
  const router = useRouter();

  // const fetchData = async () => {
  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(`${API_URL}/books/user`, {
  //       headers: {
  //         Authorization: `Bearer ${token}`, // Assuming you have a token variable
  //       },
  //     });
  //     const data = await response.json();
  //     if (!response.ok) {
  //       throw new Error(data.message || "Failed to fetch books");
  //     }
  //     setBooks(data);
  //   } catch (error) {
  //     console.error("Error fetching data:", error);
  //     Alert.alert(
  //       "Error",
  //       error.message || "Something went wrong while fetching books"
  //     );
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   fetchData();
  // }, []);

  // const renderBookItem = ({ item }) => (
  //   <View style={styles.bookItem}>
  //     <Image source={item.image} style={styles.bookImage} />
  //     <View style={styles.bookInfo}>
  //       <Text style={styles.bookTitle}>{item.title}</Text>
  //       <View style={styles.ratingContainer}>
  //         {renderRatingStars(item.rating)}
  //       </View>
  //       <Text style={styles.bookCaption} numberOfLines={2}>
  //         {item.caption}
  //       </Text>
  //       <Text style={styles.bookDate}>
  //         {new Date(item.createdAt).toLocaleDateString()}
  //       </Text>
  //     </View>
  //   </View>
  // );

  // const renderRatingStars = (rating) => {
  //   const stars = [];
  //   for (let i = 1; i <= 5; i++) {
  //     stars.push(
  //       <Ionicons
  //         name={i <= rating ? "star" : "star-outline"}
  //         size={14}
  //         color={i <= rating ? "#f4b400" : COLORS.textSecondary}
  //         style={{ marginRight: 2 }}
  //       />
  //     );
  //   }
  //   return <View style={styles.ratingContainer}>{stars}</View>;
  // };
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  const handleRefresh = async () => {
    setRefreshing(true);
    await sleep(500);
    // await fetchData();
    setRefreshing(false);
  };

  // if (isLoading) return <Loader />

  return (
    <View style={styles.container}>
      <ProfileHeader />
      <LogoutButton />
      <View style={styles.Header}>
        <Text style={styles.Title}>Edit Your Profile ✏️</Text>
      </View>
      <Update />
     
    </View>
  );
};

export default Profile;
