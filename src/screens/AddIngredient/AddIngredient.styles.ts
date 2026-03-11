import { StyleSheet } from 'react-native';
import type { Theme } from '../../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      padding: 24,
      backgroundColor: theme.background,
      alignItems: 'center',
    },
    title: {
      fontSize: 24,
      fontWeight: '600',
      color: theme.textPrimary,
      alignSelf: 'flex-start',
    },
    label: {
      fontSize: 16,
      fontWeight: '500',
      color: theme.textPrimary,
      alignSelf: 'flex-start',
      marginTop: 16,
      marginBottom: 8,
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      borderBottomWidth: 1,
      borderBottomColor: theme.border,
    },
    input: {
      flex: 1,
      paddingVertical: 8,
      fontSize: 16,
      color: theme.textPrimary,
    },
    primaryButton: {
      width: '100%',
      backgroundColor: theme.primary,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 6,
      alignItems: 'center',
    },
    secondaryButton: {
      backgroundColor: theme.secondary,
      paddingVertical: 16,
      paddingHorizontal: 24,
      borderRadius: 6,
      alignItems: 'center',
    },
    primaryButtonText: {
      color: theme.surface,
      fontWeight: '600',
      fontSize: 16,
    },
    imagePreview: {
      width: '100%',
      height: 200,
      borderRadius: 8,
      marginTop: 16,
    },
    pickerContainer: {
      flex: 1,
      borderWidth: 1,
      borderColor: theme.border,
      borderRadius: 8,
      marginBottom: 24,
      justifyContent: 'center',
    },
  });