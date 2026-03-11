import { StyleSheet } from "react-native";
import type { Theme } from "../../../types/Theme";
import { spacing } from "../../../themes/spacing";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    overlay: {
      flex: 1,
      backgroundColor: "rgba(0,0,0,0.4)",
    },
    modalContainer: {
      position: "absolute",
      top: "35%",
      left: "10%",
      right: "10%",
      backgroundColor: theme.cardBackground,
      padding: spacing.lg,
      borderRadius: 16,
      elevation: 10,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      alignItems: "center",
    },
    title: {
      fontSize: 18,
      fontWeight: "600",
      color: theme.textPrimary,
      marginBottom: spacing.sm,
      textAlign: "center",
    },
    message: {
      fontSize: 16,
      color: theme.textSecondary,
      textAlign: "center",
      marginBottom: spacing.md,
    },
    button: {
      backgroundColor: theme.primary,
      paddingVertical: spacing.sm,
      paddingHorizontal: spacing.lg,
      borderRadius: 12,
      alignSelf: "stretch",
      alignItems: "center",
      marginTop: spacing.sm,
    },
    buttonText: {
      color: theme.surface,
      fontWeight: "600",
      fontSize: 16,
    },
  });