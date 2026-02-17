import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { spacing } from '../../themes/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    marginBottom: spacing.md,
    color: colors.textPrimary,
    fontWeight: '600',
  },
  message: {
  fontSize: 16,
  color: colors.textSecondary,
  marginTop: spacing.md,
},
  fixedButton: {
    position: 'absolute',
    bottom: 16,
    left: spacing.lg,
    right: spacing.lg,
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 6,
    alignItems: 'center',
  },
  fixedButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});
