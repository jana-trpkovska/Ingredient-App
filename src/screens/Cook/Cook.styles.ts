import { StyleSheet } from 'react-native';
import type { Theme } from '../../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingHorizontal: 16,
      paddingTop: 24,
    },

    title: {
      fontSize: 22,
      fontWeight: '700',
      color: theme.textPrimary,
      marginBottom: 16,
    },

    listContent: {
      paddingBottom: 100,
    },
    
    addButton: {
      position: 'absolute',
      bottom: 30,
      left: 20,
      right: 20,
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 10,
      alignItems: 'center',
    },

    addButtonText: {
      color: theme.surface,
      fontSize: 16,
      fontWeight: '600',
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginTop: 50,
      paddingHorizontal: 40,
    },
    emptyImage: {
      width: 250,
      height: 250,
      resizeMode: 'contain',
      marginBottom: 20,
    },
    emptyTitle: {
      fontSize: 18,
      fontWeight: '600',
      color: theme.textPrimary,
      marginBottom: 8,
      textAlign: 'center',
    },
    emptySubtitle: {
      fontSize: 14,
      color: theme.textSecondary,
      textAlign: 'center',
      lineHeight: 20,
    },
});