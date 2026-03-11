import { StyleSheet } from "react-native";
import type { Theme } from '../../types/Theme';

export const createStyles = (theme: Theme) => 
  StyleSheet.create({
    container: {
      padding: 24,
      backgroundColor: theme.background,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: 8,
      color: theme.textPrimary,
    },
    ingredientListContainer: {
      maxHeight: 300,
      marginBottom: 16,
    },
    ingredientOptionList: {
      paddingBottom: 8,
    },
    searchButton: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: 24,
    },
    searchButtonText: {
      color: theme.surface,
      fontWeight: '600',
      fontSize: 16,
    },
    recipeList: {
      paddingBottom: 24,
    },
    emptyText: {
      textAlign: 'center',
      color: theme.textSecondary,
      marginVertical: 16,
    },
    noIngredientsText: {
      color: theme.textSecondary,
      fontSize: 14,
      marginTop: 5,
      textAlign: 'center',
    },
    emptyContainer: {
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: 30,
      paddingHorizontal: 40,
    },
    emptyImage: {
      width: 100,
      height: 100,
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