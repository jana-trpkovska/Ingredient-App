import { StyleSheet } from "react-native";
import type { Theme } from '../../../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: 8,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: 8,
      backgroundColor: theme.cardBackground,
      elevation: 2,
    },
    cardSelected: {
      backgroundColor: theme.primaryVariant,
      borderColor: theme.primary,
    },
    image: {
      width: 40,
      height: 40,
      borderRadius: 8,
      marginRight: 16,
    },
    text: {
      fontSize: 15,
      color: theme.textPrimary,
    },
    textSelected: {
      fontWeight: '600',
      color: theme.primary,
    },
  });