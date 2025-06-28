import { create } from "zustand"
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from "../constants/api";

export const useAuthStore = create((set) => ({
    user: null,
    token: null,
    isLoading: false,
    isCheckingAuth: true,
    register: async (username, email, password, mobile, relativeMobile) => {

        set({ isLoading: true })
        try {
            const response = await fetch(`${API_URL}/api/auth/register`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    username,
                    email,
                    password,
                    mobile,
                    relativeMobile,
                })
            })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message || "Something went wrong")

            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", data.token)
            set({ token: data.token, user: data.user, isLoading: false });
            return { success: true }

        } catch (error) {
            set({ isLoading: false })
            return { success: false, error: error.message }
        }
    },

    login: async (email, password) => {
        set({ isLoading: true })

        try {
            const response = await fetch(`${API_URL}/api/auth/login`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        email,
                        password
                    })

                })
            const data = await response.json()
            if (!response.ok) throw new Error(data.message || "Something went wrong")

            await AsyncStorage.setItem("user", JSON.stringify(data.user))
            await AsyncStorage.setItem("token", data.token)
            set({ token: data.token, user: data.user, isLoading: false });
            return { success: true }

        } catch (error) {
            set({ isLoading: false })
            return { success: false, error: error.message }
        }

    }

    ,

    checkAuth: async () => {

        try {
            const token = await AsyncStorage.getItem("token")
            const userJson = await AsyncStorage.getItem("user")
            const user = userJson ? JSON.parse(userJson) : null;
            set({ token, user })
        }
        catch (error) {
            console.log("Auth check failed ", error)
        } finally {
            set({ isCheckingAuth: false })
        }
    }
    ,
    logout: async () => {
        await AsyncStorage.removeItem("token")
        await AsyncStorage.removeItem("user")
        set({ token: null, user: null })
    },
    updateProfile: async (username, mobile, relativeMobile) => {
        const { token } = useAuthStore.getState();

        try {
            console.log("🔐 Sending update with token:", token);
            console.log("📤 Payload:", { username, mobile, relativeMobile });

            const response = await fetch(`${API_URL}/api/auth/update`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({
                    username,
                    mobile,
                    relativeMobile,
                }),
            });

            const data = await response.json(); // ✅ read once here
            console.log("[updateProfile] Response Data:", data);

            if (!response.ok) {
                console.error("❌ Server Error:", data.message || "Unknown error");
                return { success: false, error: data.message || "Update failed" };
            }

            // Save updated user
            await AsyncStorage.setItem("user", JSON.stringify(data.user));

            // Update Zustand store
            useAuthStore.setState({ user: data.user });

            return { success: true };
        } catch (error) {
            console.error("❌ [updateProfile] Exception:", error.message);
            return { success: false, error: error.message };
        }
    },


}))