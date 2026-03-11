import { StyleSheet } from "react-native";
import type { Theme } from "../../../types/Theme";

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.cardBackground,
      borderRadius: 14,
      marginBottom: 16,
      overflow: "hidden",
      elevation: 2,
    },
    cardDisabled: {
      backgroundColor: theme.secondaryBackground,
    },
    image: {
      width: "100%",
      height: 160,
    },
    info: {
      padding: 16,
      backgroundColor: theme.cardBackground,
    },
    title: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.textPrimary,
    },
    missingText: {
      marginTop: 6,
      fontSize: 13,
      color: theme.textSecondary,
    },
  });