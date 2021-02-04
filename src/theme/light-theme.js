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
    textAlign: 'justify',
    marginHorizontal: '5%',
    fontSize: 20,
    marginBottom: 15,
    fontWeight: '600',
  },
  icon: {
    color: '#000',
  },
  color: {
    color: colors.PrimaryColor
  },
  button: {
    marginBottom: 10,
    marginTop: 15,
    height: 40,
    marginHorizontal: '10%',
    backgroundColor: '#00E676',
    borderRadius: 6,
    alignItems: 'center',
    justifyContent: 'center'
  }
});
