import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';
import { spacing } from '../../themes/spacing';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingHorizontal: spacing.md,
    paddingTop: spacing.lg,
  },

  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.textPrimary,
    marginBottom: spacing.lg,
    alignSelf: 'center',
  },

  section: {
    marginBottom: spacing.lg,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: '600',
    color: colors.settingsText,
    marginBottom: 6,
    marginLeft: 6,
  },

  card: {
    backgroundColor: colors.cardBackground,
    borderRadius: 16,
    overflow: 'hidden',

    shadowColor: '#000',
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
    color: '#1c1c1e',
    fontWeight: '500',
  },

  rowSubtitle: {
    fontSize: 12,
    color: colors.settingsText,
    marginTop: 2,
  },

  arrow: {
    fontSize: 22,
    color: colors.settingsText,
  },

  version: {
    fontSize: 14,
    color: colors.settingsText,
  },
});