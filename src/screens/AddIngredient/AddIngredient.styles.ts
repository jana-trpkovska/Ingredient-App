import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { spacing } from '../../themes/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: spacing.lg,
    backgroundColor: colors.background,
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: colors.textPrimary,
    alignSelf: 'flex-start',
  },
  label: {
    fontSize: 16,
    fontWeight: '500',
    color: colors.textPrimary,
    alignSelf: 'flex-start',
    marginTop: spacing.md,
    marginBottom: spacing.sm
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: colors.border,
  },
  input: {
    flex: 1,
    paddingVertical: spacing.sm,
    fontSize: 16,
    color: colors.textPrimary,
  },
  primaryButton: {
    width: '100%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 6,
    alignItems: 'center',
  },
secondaryButton: {
    backgroundColor: colors.secondary,
    paddingVertical: spacing.md,
    paddingHorizontal: spacing.lg,
    borderRadius: 6,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginTop: spacing.md,
  },
  pickerContainer: {
    flex: 1,
    borderWidth: 1,
    borderColor: colors.border,
    borderRadius: 8,
    marginBottom: spacing.lg,
    justifyContent: 'center',
  },
});
