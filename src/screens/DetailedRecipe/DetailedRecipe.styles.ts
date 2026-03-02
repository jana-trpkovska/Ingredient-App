import { StyleSheet } from 'react-native';
import { colors } from '../../themes/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },

  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
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
    backgroundColor: 'rgba(0,0,0,0.45)',
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
    color: '#fff',
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
  backgroundColor: 'rgba(255,255,255,0.15)',
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
  color: '#fff',
  fontWeight: '600',
},

contentCard: {
  backgroundColor: '#fff',
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
  color: colors.textPrimary,
},

summaryText: {
  fontSize: 15,
  lineHeight: 24,
  color: colors.textPrimary,
  textAlign: 'justify'
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
  backgroundColor: colors.primary,
  marginRight: 12,
},

ingredientText: {
  fontSize: 15,
  color: colors.textPrimary,
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
  backgroundColor: colors.primary,
  justifyContent: 'center',
  alignItems: 'center',
  marginRight: 14,
},

stepBadgeText: {
  color: '#fff',
  fontWeight: 'bold',
  fontSize: 14,
},

stepText: {
  flex: 1,
  fontSize: 15,
  lineHeight: 24,
  color: colors.textPrimary,
  textAlign: 'justify',
},

noInstructions: {
  fontSize: 15,
  fontStyle: 'italic',
  color: colors.textSecondary,
},
});