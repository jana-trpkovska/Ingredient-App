import { StyleSheet } from 'react-native';
import type { Theme } from '../../types/Theme';

export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },

    scrollContainer: {
      flex: 1,
    },

    center: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.background,
    },

    heroContainer: {
      height: 340,
      position: 'relative',
    },

    heroImage: {
      width: '100%',
      height: '100%',
    },

    heroOverlay: {
      position: 'absolute',
      width: '100%',
      height: '100%',
      backgroundColor: theme.detailedRecipeImage,
    },

    heroContent: {
      position: 'absolute',
      bottom: 30,
      left: 20,
      right: 20,
    },

    heroTitle: {
      fontSize: 28,
      fontWeight: 'bold',
      color: theme.surface,
    },

    heroInfoRow: {
      flexDirection: 'row',
      marginTop: 12,
      marginBottom: 12,
    },

    heroInfoItem: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 20,
      backgroundColor: theme.detailedRecipeHeroInfo,
      paddingHorizontal: 10,
      paddingVertical: 6,
      borderRadius: 12,
    },

    heroInfoIcon: {
      width: 25,
      height: 25,
      marginRight: 6,
      resizeMode: 'contain',
    },

    heroInfoText: {
      fontSize: 14,
      color: theme.surface,
      fontWeight: '600',
    },

    contentCard: {
      backgroundColor: theme.background,
      marginTop: -30,
      borderTopLeftRadius: 28,
      borderTopRightRadius: 28,
      padding: 24,
      paddingBottom: 50,
    },

    sectionTitle: {
      fontSize: 19,
      fontWeight: '700',
      marginTop: 24,
      marginBottom: 14,
      color: theme.textPrimary,
    },

    summaryText: {
      fontSize: 15,
      lineHeight: 24,
      color: theme.textPrimary,
      textAlign: 'justify',
    },

    ingredientRow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: 10,
    },

    bullet: {
      width: 9,
      height: 9,
      borderRadius: 4.5,
      backgroundColor: theme.primary,
      marginRight: 12,
    },

    ingredientText: {
      fontSize: 15,
      color: theme.textPrimary,
    },

    missingIcon: {
      width: 18,
      height: 18,
      marginLeft: 8,
    },

    stepRow: {
      flexDirection: 'row',
      alignItems: 'flex-start',
      marginBottom: 20,
    },

    stepBadge: {
      width: 34,
      height: 34,
      borderRadius: 17,
      backgroundColor: theme.primary,
      justifyContent: 'center',
      alignItems: 'center',
      marginRight: 14,
    },

    stepBadgeText: {
      color: theme.surface,
      fontWeight: 'bold',
      fontSize: 14,
    },

    stepText: {
      flex: 1,
      fontSize: 15,
      lineHeight: 24,
      color: theme.textPrimary,
      textAlign: 'justify',
    },

    noInstructions: {
      fontSize: 15,
      fontStyle: 'italic',
      color: theme.textSecondary,
    },

    cookButton: {
      position: 'absolute',
      left: 20,
      right: 20,
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 10,
      alignItems: 'center',
    },

    cookButtonText: {
      color: theme.surface,
      fontWeight: '600',
      fontSize: 16,
    },
});