import { StyleSheet } from "react-native";
import type { Theme } from '../../../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      marginBottom: 16,
      overflow: 'hidden',
      elevation: 3,
    },
    image: {
      width: 100,
      height: 100,
    },
    info: {
      flex: 1,
      padding: 16,
      justifyContent: 'space-between',
    },
    title: {
      fontWeight: '600',
      fontSize: 16,
      marginBottom: 8,
      color: theme.textPrimary,
    },
    subtitle: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 8,
    },
    saveButtonText: {
      marginLeft: 8,
      color: theme.textSecondary,
      fontWeight: '500',
    },
  });