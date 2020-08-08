import { StyleSheet } from 'react-native';

export const colors = {
  PrimaryColor: '#fafafa',
  BackgroundColor: '#fafafa',
};

export const lightTheme = StyleSheet.create({
  container: {
    backgroundColor: colors.BackgroundColor,
    paddingHorizontal: 10,
    flex: 1,
  },
  header: {},
  customDrawerContent: {
    padding: 5,
  },
  text: {
    color: '#000',
  },
  flatlist: {
    marginTop: 20,
    marginBottom: 15,
    borderRadius: 6,
  },
  textHeading: {
    color: '#000',
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '600',
  },
  icon: {
    color: '#000',
  },
});
