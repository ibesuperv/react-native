// import { useRouter } from "expo-router";
// import { useState } from "react";
// import {
//   View,
//   Text,
//   KeyboardAvoidingView,
//   Platform,
//   ScrollView,
//   TextInput,
//   TouchableOpacity,
//   Alert,
//   Image,
//   ActivityIndicator,
// } from "react-native";
// import styles from "../../assets/styles/create.styles";
// import { Ionicons } from "@expo/vector-icons";
// import COLORS from "../../constants/colors";
// import * as ImagePicker from "expo-image-picker";
// import * as FileSystem from "expo-file-system";
// import { useAuthStore } from "../../store/authStore";
// import { API_URL } from "../../constants/api";

// const Create = () => {
//   const [title, setTitle] = useState("");
//   const [caption, setCaption] = useState("");
//   const [rating, setRating] = useState(3);
//   const [image, setImage] = useState(null);
//   const [imageBase62, setImageBase62] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const { token } = useAuthStore();

//   const router = useRouter();
//   const pickImage = async () => {
//     try {
//       if (Platform.OS !== "web") {
//         const { status } =
//           await ImagePicker.requestMediaLibraryPermissionsAsync();
//         if (status !== "granted") {
//           Alert.alert(
//             "Permission Denied",
//             "We need camera roll permissions to select an image."
//           );
//           return;
//         }
//       }
//       const result = await ImagePicker.launchImageLibraryAsync({
//         mediaTypes: "images",
//         allowsEditing: true,
//         aspect: [4, 3],
//         quality: 0.5,
//         base64: true,
//       });

//       if (!result.canceled) {
//         setImage(result.assets[0].uri);
//         if (result.assets[0].base64) {
//           setImageBase62(result.assets[0].base64);
//         } else {
//           const base64 = await FileSystem.readAsStringAsync(
//             result.assets[0].uri,
//             {
//               encoding: FileSystem.EncodingType.Base64,
//             }
//           );
//           setImageBase62(base64);
//         }
//       }
//     } catch (error) {
//       console.error("Error picking image:", error);
//     }
//   };

//   const renderRatingPicker = () => {
//     const stars = [];
//     for (let i = 1; i <= 5; i++) {
//       stars.push(
//         <TouchableOpacity
//           key={i}
//           onPress={() => setRating(i)}
//           style={styles.starButton}
//         >
//           <Ionicons
//             name={i <= rating ? "star" : "star-outline"}
//             size={32}
//             color={i <= rating ? "#f4b400" : COLORS.textSecondary}
//           />
//         </TouchableOpacity>
//       );
//     }
//     return <View style={styles.ratingContainer}>{stars}</View>;
//   };

//   const handleSubmit = async () => {
//     if (!title || !caption || !imageBase62 || !rating) {
//       Alert.alert(
//         "Missing Fields",
//         "Please fill in all fields and select an image."
//       );
//       return;
//     }

//     try {
//       setLoading(true);
//       const uriParts = image.split(".");
//       const fileType = uriParts[uriParts.length - 1];
//       const imageType = fileType
//         ? `image/${fileType.toLowerCase()}`
//         : "image/jpeg";
//       const imageDataUrl = `data:${imageType};base64,${imageBase62}`;

//       const response = await fetch(`${API_URL}/api/books`, {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           title,
//           caption,
//           rating,
//           image: imageDataUrl,
//         }),
//       });

//       const responseText = await response.text();

//       if (!response.ok) {
//         console.error("Server Error Response:", responseText);
//         throw new Error("Failed to submit: " + responseText);
//       }

//       let data;
//       try {
//         data = JSON.parse(responseText);
//       } catch (jsonError) {
//         console.error("Failed to parse JSON:", responseText);
//         throw new Error("Invalid JSON response from server");
//       }

//       Alert.alert("Success", "Book recommendation submitted successfully!");
//       setTitle("");
//       setCaption("");
//       setRating(3);
//       setImage(null);
//       setImageBase62(null);
//       router.push("/");
//     } catch (error) {
//       console.error("Error submitting book recommendation:", error);
//       Alert.alert(
//         "Error",
//         error.message || "Failed to submit book recommendation."
//       );
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <KeyboardAvoidingView
//       style={{ flex: 1 }}
//       behavior={Platform.OS === "ios" ? "padding" : "height"}
//     >
//       <ScrollView
//         contentContainerStyle={styles.container}
//         style={styles.scrollViewStyle}
//       >
//         <View style={styles.card}>
//           <View style={styles.header}>
//             <Text style={styles.title}>Add Book Recommendation</Text>
//             <Text style={styles.subtitle}>
//               Share your favorite books with the community!
//             </Text>
//           </View>

//           <View style={styles.form}>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Book Title</Text>
//               <View style={styles.inputContainer}>
//                 <Ionicons
//                   name="book-outline"
//                   size={20}
//                   color={COLORS.textSecondary}
//                   style={styles.inputIcon}
//                 />
//                 <TextInput
//                   style={styles.input}
//                   placeholder="Enter book title"
//                   placeholderTextColor={COLORS.placeholderText}
//                   value={title}
//                   onChangeText={setTitle}
//                 />
//               </View>
//             </View>
//             <View style={styles.formGroup}>
//               <Text style={styles.label}>Your Rating</Text>
//               {renderRatingPicker()}
//             </View>
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Book Image</Text>
//             <TouchableOpacity style={styles.imagePicker} onPress={pickImage}>
//               {image ? (
//                 <Image source={{ uri: image }} style={styles.previewImage} />
//               ) : (
//                 <View style={styles.placeholderContainer}>
//                   <Ionicons
//                     name="image-outline"
//                     size={40}
//                     color={COLORS.textSecondary}
//                   />
//                   <Text style={styles.placeholderText}>
//                     Tap to select an image
//                   </Text>
//                 </View>
//               )}
//             </TouchableOpacity>
//           </View>

//           <View style={styles.formGroup}>
//             <Text style={styles.label}>Book Caption</Text>
//             <TextInput
//               style={styles.textArea}
//               placeholder="Write your review or thoughts about this book..."
//               placeholderTextColor={COLORS.placeholderText}
//               value={caption}
//               onChangeText={setCaption}
//               multiline
//             />
//           </View>
//           <TouchableOpacity
//             style={styles.button}
//             onPress={handleSubmit}
//             disabled={loading}
//           >
//             {loading ? (
//               <ActivityIndicator color={COLORS.white} />
//             ) : (
//               <>
//                 <Ionicons
//                   name="cloud-upload-outline"
//                   size={20}
//                   color={COLORS.white}
//                   style={styles.buttonIcon}
//                 />
//                 <Text style={styles.buttonText}>Share</Text>
//               </>
//             )}
//           </TouchableOpacity>
//         </View>
//       </ScrollView>
//     </KeyboardAvoidingView>
//   );
// };

// export default Create;



import { View, Text } from 'react-native'
import React from 'react'

const map = () => {
  return (
    <View>
      <Text>map</Text>
    </View>
  )
}

export default map