import { StyleSheet } from 'react-native';

export const colors = {
  PrimaryColor: '#00E676',
  BackgroundColor: '#000',
};

export const darkTheme = StyleSheet.create({
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
    color: '#fff',
  },
  textHeading: {
    color: colors.PrimaryColor,
    textAlign: 'justify',
    marginHorizontal: '5%',
    fontSize: 20,
    marginBottom: 15,
    fontWeight: 'bold',
  },
  icon: {
    color: colors.PrimaryColor,
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
  },
  buttonText: {
    color: '#000'
  },
  card: {
    backgroundColor: '#1F1F1F',
    marginTop: 10,
    height: 65,
    justifyContent: 'center',
    flex: 1,
    borderRadius: 6
  }
});
