import 'react-native-gesture-handler';
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {TailwindProvider} from 'tailwind-rn';
import utilities from './tailwind.json';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';
import {DefaultTheme, Provider as PaperProvider} from 'react-native-paper';
import {registerTranslation} from 'react-native-paper-dates';
import {Provider as ReduxProvider} from 'react-redux';
import {store} from './src/redux/store';
import RootNavigator from './src/navigator/RootNavigator';

registerTranslation('en', {
  save: 'Save',
  selectSingle: 'Select date',
  selectMultiple: 'Select dates',
  selectRange: 'Select period',
  notAccordingToDateFormat: inputFormat => `Date format must be ${inputFormat}`,
  mustBeHigherThan: date => `Must be later then ${date}`,
  mustBeLowerThan: date => `Must be earlier then ${date}`,
  mustBeBetween: (startDate, endDate) =>
    `Must be between ${startDate} - ${endDate}`,
  dateIsDisabled: 'Day is not allowed',
  previous: 'Previous',
  next: 'Next',
  typeInDate: 'Type in date',
  pickDateFromCalendar: 'Pick date from calendar',
  close: 'Close',
});

function App() {
  useEffect(() => {
    // restore isAuth
    // 1. check asyncStorage -> token (basic)
    // 2. request -> check if token is valid (adv)
  }, []);

  const themeWhite = {
    ...DefaultTheme,
    roundness: 2,
    colors: {
      ...DefaultTheme.colors,
      primary: '#000099',
      accent: '#D2DAFF',
      background: '#FFFFFF',
      text: '#000000',
    },
  };

  const themeBlack = {
    ...DefaultTheme,
    colors: {
      ...DefaultTheme.colors,
      border: 'transparent',
    },
  };
  useEffect(() => {
    SplashScreen.hide(); //hides the splash screen on app load.
  }, []);

  return (
    // @ts-ignore
    <NavigationContainer theme={themeBlack}>
      {/* @ts-ignore */}
      <TailwindProvider utilities={utilities}>
        <PaperProvider theme={themeWhite}>
          <ReduxProvider store={store}>
            <RootNavigator />
          </ReduxProvider>
        </PaperProvider>
      </TailwindProvider>
    </NavigationContainer>
  );
}

export default App;
