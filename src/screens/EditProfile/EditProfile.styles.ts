import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { spacing } from '../../themes/spacing';

export const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#f2f2f2',
    alignItems: 'center',
  },

  centered: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },

  message: {
    fontSize: 16,
    color: colors.textSecondary,
  },

  header: {
    width: '100%',
    height: 160,
    backgroundColor: colors.headerBackground,
  },

  avatar: {
    width: 110,
    height: 110,
    marginTop: -55,
  },

  title: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: spacing.md,
    marginBottom: spacing.md,
    color: colors.textPrimary,
  },

  card: {
    width: '90%',
    backgroundColor: 'white',
    borderRadius: 16,
    padding: spacing.lg,
    marginBottom: spacing.lg,

    shadowColor: '#000',
    shadowOpacity: 0.08,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    elevation: 3,
  },

  label: {
    fontSize: 14,
    fontWeight: '500',
    color: colors.textSecondary,
    marginBottom: 6,
  },

  input: {
    fontSize: 16,
    paddingVertical: spacing.sm,
    color: colors.textPrimary,
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: spacing.md,
  },

  picker: {
    width: '100%',
    color: colors.textPrimary,
  },

  primaryButton: {
    width: '90%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
  },

  primaryButtonText: {
    color: colors.white,
    fontWeight: '600',
    fontSize: 16,
  },
});