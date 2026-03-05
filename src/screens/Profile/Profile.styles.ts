import { StyleSheet } from "react-native";
import { colors } from "../../themes/colors";
import { spacing } from "../../themes/spacing";

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

  name: {
    fontSize: 22,
    fontWeight: '700',
    marginTop: spacing.md,
    color: colors.textPrimary,
  },

  username: {
    fontSize: 14,
    color: colors.textSecondary,
    marginBottom: spacing.lg,
  },

  infoCard: {
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

  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  infoLabel: {
    fontSize: 14,
    color: colors.textSecondary,
  },

  infoValue: {
    fontSize: 15,
    fontWeight: '600',
    color: colors.textPrimary,
  },

  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: spacing.md,
  },

  primaryButton: {
    width: '90%',
    backgroundColor: colors.primary,
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: spacing.md,
  },

  primaryButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },

  logoutButton: {
    width: '90%',
    borderWidth: 1,
    borderColor: colors.primary,
    backgroundColor: 'white',
    paddingVertical: spacing.md,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: spacing.sm,
  },

  logoutText: {
    color: colors.primary,
    fontWeight: '600',
    fontSize: 16,
  },

});