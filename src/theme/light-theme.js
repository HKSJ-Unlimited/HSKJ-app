import {StyleSheet} from 'react-native';

export const colors = {
  PrimaryColor: '',
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
});
