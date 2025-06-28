import { StyleSheet } from "react-native";
import COLORS from "../../constants/colors";

const styles = StyleSheet.create({
  // General container
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
    padding: 16,
  },

  // Loading state
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
  },

  // Header section (Home)
  header: {
    marginBottom: 20,
    alignItems: "center",
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: "JetBrainsMono-Medium",
    letterSpacing: 0.5,
    color: COLORS.primary,
    marginBottom: 8,
  },
  headerSubtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    textAlign: "center",
  },

  // Card container
  card: {
    backgroundColor: COLORS.cardBackground,
    borderRadius: 16,
    padding: 20,
    shadowColor: COLORS.black,
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 4,
    alignItems: "center",
  },

  // Profile image
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 12,
  },

  // Username text
  username: {
    fontSize: 20,
    fontWeight: "bold",
    color: COLORS.textPrimary,
    marginBottom: 10,
  },

  // Status boxes
  statusBoxContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 12,
    marginBottom: 20,
  },
  statusBox: {
    flex: 1,
    padding: 12,
    borderRadius: 12,
    alignItems: "center",
  },
  blinkingBox: {
    // Animations can be handled in component logic
  },
  statusText: {
    color: COLORS.textDark,
    fontWeight: "600",
    fontSize: 14,
  },

  // Location button
  locationButton: {
    backgroundColor: COLORS.primary,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 10,
  },
  locationButtonText: {
    color: COLORS.white,
    fontWeight: "600",
    fontSize: 16,
    textAlign: "center",
  },
});

export default styles;
