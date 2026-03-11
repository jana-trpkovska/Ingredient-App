import { StyleSheet } from "react-native";
import type { Theme } from '../../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      alignItems: 'center',
    },

    centered: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },

    message: {
      fontSize: 16,
      color: theme.textSecondary,
    },

    header: {
      width: '100%',
      height: 160,
      backgroundColor: theme.headerBackground,
    },

    avatar: {
      width: 110,
      height: 110,
      marginTop: -55,
    },

    name: {
      fontSize: 22,
      fontWeight: '700',
      marginTop: 16,
      color: theme.textPrimary,
    },

    username: {
      fontSize: 14,
      color: theme.textSecondary,
      marginBottom: 24,
    },

    infoCard: {
      width: '90%',
      backgroundColor: theme.cardBackground,
      borderRadius: 16,
      padding: 24,
      marginBottom: 24,

      shadowColor: theme.textPrimary,
      shadowOpacity: 0.08,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },
      elevation: 3,
    },

    infoRow: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },

    infoLabel: {
      fontSize: 14,
      color: theme.textSecondary,
    },

    infoValue: {
      fontSize: 15,
      fontWeight: '600',
      color: theme.textPrimary,
    },

    divider: {
      height: 1,
      backgroundColor: theme.secondaryBackground,
      marginVertical: 16,
    },

    primaryButton: {
      width: '90%',
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 16,
    },

    primaryButtonText: {
      color: theme.surface,
      fontSize: 16,
      fontWeight: '600',
    },

    logoutButton: {
      width: '90%',
      borderWidth: 1,
      borderColor: theme.primary,
      backgroundColor: theme.background,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginTop: 8,
    },

    logoutText: {
      color: theme.primary,
      fontWeight: '600',
      fontSize: 16,
    },
});