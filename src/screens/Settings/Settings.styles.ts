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
      fontSize: 24,
      fontWeight: '700',
      color: theme.textPrimary,
      marginBottom: 24,
      alignSelf: 'center',
    },

    section: {
      marginBottom: 24,
    },

    sectionTitle: {
      fontSize: 13,
      fontWeight: '600',
      color: theme.settingsText,
      marginBottom: 6,
      marginLeft: 6,
    },

    card: {
      backgroundColor: theme.cardBackground,
      borderRadius: 16,
      overflow: 'hidden',

      shadowOpacity: 0.06,
      shadowRadius: 6,
      shadowOffset: { width: 0, height: 3 },

      elevation: 3,
    },

    row: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',

      paddingVertical: 16,
      paddingHorizontal: 16,
    },

    rowLeft: {
      flex: 1,
    },

    rowLabel: {
      fontSize: 16,
      color: theme.textPrimary,
      fontWeight: '500',
    },

    rowSubtitle: {
      fontSize: 12,
      color: theme.settingsText,
      marginTop: 2,
    },

    arrow: {
      fontSize: 22,
      color: theme.settingsText,
    },

    version: {
      fontSize: 14,
      color: theme.settingsText,
    },
});