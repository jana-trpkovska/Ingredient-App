import { StyleSheet } from 'react-native';
import type { Theme } from '../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 24,
      justifyContent: 'center'
    },
    logo: {
      width: 150,
      height: 150,
      alignSelf: 'center',
      marginBottom: 40,
      resizeMode: 'contain',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
      marginBottom: 24,
    },
    input: {
      flex: 1,
      paddingVertical: 8,
      fontSize: 16,
      color: theme.textPrimary,
    },
    primaryButton: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 6,
      marginTop: 16,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: theme.surface,
      fontWeight: '600',
      letterSpacing: 1,
    },
    footerText: {
      textAlign: 'center',
      marginTop: 40,
      color: theme.textSecondary,
    },
    link: {
      color: theme.primary,
      fontWeight: '600',
    },
});
