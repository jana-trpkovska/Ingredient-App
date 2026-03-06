import { StyleSheet } from "react-native";
import { spacing } from '../../themes/spacing';
import type { Theme } from '../../types/Theme';

export const createStyles = (theme: Theme) => 
  StyleSheet.create({
    container: {
      padding: spacing.lg,
      backgroundColor: theme.background,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: '600',
      marginBottom: spacing.sm,
      color: theme.textPrimary,
    },

    ingredientListContainer: {
      maxHeight: 300,
      marginBottom: spacing.md,
    },
    ingredientOptionList: {
      paddingBottom: spacing.sm,
    },
    ingredientOptionCard: {
      flexDirection: 'row',
      alignItems: 'center',
      padding: spacing.sm,
      borderRadius: 12,
      borderWidth: 1,
      borderColor: theme.border,
      marginBottom: spacing.sm,
      backgroundColor: theme.cardBackground,
      elevation: 2,
    },
    ingredientOptionCardSelected: {
      backgroundColor: theme.primaryVariant,
      borderColor: theme.primary,
    },
    ingredientOptionImage: {
      width: 40,
      height: 40,
      borderRadius: 8,
      marginRight: spacing.md,
    },
    ingredientOptionText: {
      fontSize: 15,
      color: theme.textPrimary,
    },
    ingredientOptionTextSelected: {
      fontWeight: '600',
      color: theme.primary,
    },

    searchButton: {
      backgroundColor: theme.primary,
      paddingVertical: spacing.md,
      borderRadius: 12,
      alignItems: 'center',
      marginBottom: spacing.lg,
    },
    searchButtonText: {
      color: theme.surface,
      fontWeight: '600',
      fontSize: 16,
    },

    recipeList: {
      paddingBottom: spacing.lg,
    },
    recipeCard: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: theme.cardBackground,
      borderRadius: 12,
      marginBottom: spacing.md,
      overflow: 'hidden',
      elevation: 3,
    },
    recipeImage: {
      width: 100,
      height: 100,
    },
    recipeInfo: {
      flex: 1,
      padding: spacing.md,
      justifyContent: 'space-between',
    },
    recipeTitle: {
      fontWeight: '600',
      fontSize: 16,
      marginBottom: spacing.sm,
      color: theme.textPrimary,
    },
    recipeSubtitle: {
      fontSize: 12,
      color: theme.textSecondary,
    },
    saveButton: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: spacing.sm,
    },
    saveButtonSaved: {},
    saveButtonText: {
      marginLeft: spacing.sm,
      color: theme.textSecondary,
      fontWeight: '500',
    },
    emptyText: {
      textAlign: 'center',
      color: theme.textSecondary,
      marginVertical: spacing.md,
    },
    noIngredientsText: {
      color: theme.textSecondary,
      fontSize: 14,
      marginTop: 5,
      textAlign: 'center',
    },
});