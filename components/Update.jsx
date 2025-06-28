import {
  View,
  Text,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ActivityIndicator,
  Alert,
} from "react-native";
import React, { useState, useRef } from "react";
import styles from "../assets/styles/signup.styles";
import { Ionicons } from "@expo/vector-icons";
import COLORS from "../constants/colors";
import { useAuthStore } from "../store/authStore";
import { useFocusEffect } from "@react-navigation/native";

const Update = () => {
  const { user, updateProfile, isLoading } = useAuthStore();

  const [editingField, setEditingField] = useState(null);
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [relativeMobile, setRelativeMobile] = useState("");

  const nameRef = useRef(null);
  const mobileRef = useRef(null);
  const relativeRef = useRef(null);

  // Reset state whenever screen is focused
  useFocusEffect(
    React.useCallback(() => {
      if (user) {
        setUsername(user.username || "");
        setMobile(user.mobile?.replace("+91", "") || "");
        setRelativeMobile(user.relativeMobile?.replace("+91", "") || "");
      }
      setEditingField(null);
    }, [user])
  );

  const handleEdit = (field) => {
    setEditingField(field);
    setTimeout(() => {
      if (field === "name") nameRef.current?.focus();
      if (field === "mobile") mobileRef.current?.focus();
      if (field === "relative") relativeRef.current?.focus();
    }, 100);
  };

  const handleCancelEdit = (field) => {
    if (field === "name") setUsername(user?.username || "");
    if (field === "mobile") setMobile(user?.mobile?.replace("+91", "") || "");
    if (field === "relative")
      setRelativeMobile(user?.relativeMobile?.replace("+91", "") || "");
    setEditingField(null);
  };

  const handleBlur = () => {
    setEditingField(null);
  };

  const hasChanges = () =>
    username !== user?.username ||
    mobile !== user?.mobile?.replace("+91", "") ||
    relativeMobile !== user?.relativeMobile?.replace("+91", "");

  const handleSaveChanges = () => {
    Alert.alert(
      "Confirm Update",
      "Are you sure you want to update your profile?",
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Yes",
          onPress: async () => {
            console.log("📤 Triggering profile update...");
            console.log("Payload:", { username, mobile, relativeMobile });

            const result = await updateProfile(
              username,
              mobile,
              relativeMobile
            );

            if (result.success) {
              alert("✅ Profile updated successfully");
              setEditingField(null);
              Keyboard.dismiss();
            } else {
              alert("❌ Update failed: " + result.error);
              console.error("❌ Update failed. Full error:", result);
            }
          },
        },
      ]
    );
  };

  const renderField = ({
    label,
    icon,
    value,
    onChangeText,
    placeholder,
    refObj,
    fieldKey,
    keyboardType = "default",
  }) => {
    const isEditing = editingField === fieldKey;

    
    let originalValue = "";
    if (fieldKey === "name") originalValue = user?.username || "";
    if (fieldKey === "mobile")
      originalValue = user?.mobile?.replace("+91", "") || "";
    if (fieldKey === "relative")
      originalValue = user?.relativeMobile?.replace("+91", "") || "";

    const isChanged = value !== originalValue;

    return (
      <View style={styles.inputGroup}>
        <Text style={styles.label}>{label}</Text>
        <View
          style={[
            styles.inputContainer,
            {
              backgroundColor: isEditing
                ? COLORS.inputBackground
                : isChanged
                ? "#e0f7f1" // Highlight if modified
                : "#f0f0f0", // Default
            },
          ]}
        >
          <Ionicons
            name={icon}
            size={20}
            color={COLORS.primary}
            style={styles.inputIcon}
          />
          <TextInput
            ref={refObj}
            value={value}
            onChangeText={onChangeText}
            placeholder={placeholder}
            placeholderTextColor={COLORS.placeholderText}
            editable={isEditing}
            onBlur={handleBlur}
            style={styles.input}
            autoCapitalize="none"
            keyboardType={keyboardType}
          />
          <TouchableOpacity
            onPress={() =>
              isEditing ? handleCancelEdit(fieldKey) : handleEdit(fieldKey)
            }
            style={styles.eyeIcon}
          >
            <Ionicons
              name={isEditing ? "close-outline" : "pencil-outline"}
              size={20}
              color={COLORS.primary}
            />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 60 : 0}
      >
        <ScrollView
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.container}>
            <View style={styles.card}>
              <View style={styles.formContainer}>
                {renderField({
                  label: "User Name",
                  icon: "person-outline",
                  value: username,
                  onChangeText: setUsername,
                  placeholder: user?.username || "",
                  refObj: nameRef,
                  fieldKey: "name",
                })}
                
                {renderField({
                  label: "Mobile Number",
                  icon: "call-outline",
                  value: mobile,
                  onChangeText: setMobile,
                  placeholder: user?.mobile?.replace("+91", "") || "",
                  refObj: mobileRef,
                  fieldKey: "mobile",
                  keyboardType: "phone-pad",
                })}
                {renderField({
                  label: "Relative Mobile Number",
                  icon: "people-outline",
                  value: relativeMobile,
                  onChangeText: setRelativeMobile,
                  placeholder: user?.relativeMobile?.replace("+91", "") || "",
                  refObj: relativeRef,
                  fieldKey: "relative",
                  keyboardType: "phone-pad",
                })}

                <TouchableOpacity
                  style={[styles.button, { opacity: hasChanges() ? 1 : 0.5 }]}
                  onPress={handleSaveChanges}
                  disabled={!hasChanges()}
                >
                  {isLoading ? (
                    <ActivityIndicator color="#fff" />
                  ) : (
                    <Text style={styles.buttonText}>Update</Text>
                  )}
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
};

export default Update;
