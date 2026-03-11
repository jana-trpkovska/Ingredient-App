import { StyleSheet } from 'react-native';

export const createStyles = (theme: any) =>
  StyleSheet.create({
    selectButton: {
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.border,
      backgroundColor: theme.inputBackground,
    },
    selectedText: {
      color: theme.text,
      fontSize: 16,
    },
    placeholderText: {
      color: theme.textSecondary,
      fontSize: 16,
    },
    modalOverlay: {
      flex: 1,
      backgroundColor: 'rgba(0,0,0,0.3)',
    },
    modalContent: {
      position: 'absolute',
      top: '30%',
      left: '10%',
      right: '10%',
      borderRadius: 12,
      paddingVertical: 8,
      maxHeight: '50%',
    },
    optionButton: {
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
    optionText: {
      fontSize: 16,
      color: theme.textPrimary,
    },
  });