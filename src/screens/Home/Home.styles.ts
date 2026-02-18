import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { spacing } from '../../themes/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    marginBottom: spacing.md,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  categoryContainer: {
    paddingBottom: spacing.md,
  },
  categoryItem: {
    alignItems: 'center',
    marginRight: spacing.md,
  },
  categoryImage: {
    width: 60,
    height: 60,
    marginBottom: 6,
  },
  categoryImageSelected: {
    borderWidth: 2,
    borderRadius: 12,
    borderColor: colors.green,
  },
  categoryText: {
    fontSize: 12,
    color: colors.textSecondary,
  },
  categoryTextSelected: {
    color: colors.green,
    fontWeight: '600',
  },
  listContent: {
    paddingBottom: 120,
  },
  message: {
    fontSize: 16,
    color: colors.textSecondary,
    marginTop: spacing.lg,
    textAlign: 'center',
  },
  fixedButton: {
    position: 'absolute',
    bottom: 16,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 8,
    alignItems: 'center',
  },
  fixedButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
