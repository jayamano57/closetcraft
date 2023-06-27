import { StyleSheet } from 'react-native';
import { COLORS } from '../styles/colors';

export const screenStyles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    flex: 1,
    backgroundColor: COLORS.white_100,
    alignItems: 'center',
    justifyContent: 'center',
  },
  header: {
    marginBottom: 32,
  },
  headerText: {
    fontSize: 32,
  },
  content: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
  },
  scrollContainer: {},
  action: {
    paddingTop: 16,
    paddingHorizontal: 32,
  },
  body: {
    flex: 1,
  },
});
