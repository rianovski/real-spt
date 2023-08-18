// This block imports necessary components and modules from React, React Native, Expo, and the Expo Location API. 
// It also imports styles from the 'StyleSheet' module.

import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import * as Location from 'expo-location';

// You can import from local files
// import AssetExample from './components/AssetExample';

export default function App() { // The main component of the application is defined as a function named App.
  const [times, setTimes] = useState(null);
  const [dates, setDates] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // These lines use the useState hook to define multiple pieces of state. 
  // These states will be used to store information like the current time, date, longitude, latitude, prayer times, and error messages.

  // Get the current LOCATION (Latitude & Longitude)
  // This useEffect hook is responsible for running the code inside the callback function when the component mounts. 
  // It uses an immediately invoked async function to perform several tasks related to fetching location, prayer times, and updating the state variables.
  useEffect(() => {
    (async () => {
      // Get device permission for access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get times for clock
      // A timer is set using the setInterval function. This timer is responsible for updating the current time and date every second.
      const timer = setInterval(() => {
        // Get times
        // This section calculates and sets the current time and date using JavaScript's Date object. 
        // It formats the time and date and updates the corresponding state variables.
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const seconds = now.getSeconds().toString().padStart(2, '0');

        // Get dates
        const days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
        const day = String(now.getDate()).padStart(2, '0');
        const month = String(now.getMonth() + 1).padStart(2, '0');
        const year = now.getFullYear();

        // Insert times & dates
        setTimes(`${hours}:${minutes}:${seconds}`);
        setDates(`${days[now.getDay()]}, ${day}/${month}/${year}`);
      }, 1000);

      // Get current location (Latitude & Longitude)

      let location = await Location.getCurrentPositionAsync({});
      const { latitude, longitude } = location.coords;

      setLatitude(latitude);
      setLongitude(longitude);

      // Get the prayer times
      const now = new Date();
      // Here, the code fetches prayer times data from an external API (http://api.aladhan.com) based on the latitude and longitude obtained earlier. 
      // The data is then stored in the prayerTimes state variable.
      const response = await fetch(
        `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const data = await response.json();
      setPrayerTimes(data.data[now.getDate() - 1]);

      console.log(data.data[now.getDate() - 1]);
      // This part of the useEffect hook returns a cleanup function that clears the timer set earlier. This ensures that the timer is stopped when the component is unmounted.
      return () => clearInterval(timer);
    })();
  }, []);

  // Variables declaration
  // In this section, variables are prepared to hold the data that will be displayed in the UI. 
  // If there is an error message, it will be displayed. 
  // If the prayer times are available, the data from the state variables is assigned to these display variables.
  let text = 'Loading..';
  let tDates = 'Loading..';
  let tTimes = 'Loading..';
  let tLongitudes = 'Loading..';
  let tLatitudes = 'Loading..';
  let tPrayerTimes = 'Loading..';
  if (errorMsg) {
    text = errorMsg;
  } else if (prayerTimes) {
    tTimes = times;
    tDates = dates;
    tLongitudes = longitude;
    tLatitudes = latitude;
    tPrayerTimes = prayerTimes.timings;
  }
  // This part of the code defines the user interface using JSX (JavaScript XML) syntax. It structures the layout and content that will be displayed on the screen. 
  // The return statement encapsulates the JSX code that defines the UI elements of the app's main component.
  // <ScrollView> is a component that provides scrollable content when the content exceeds the available screen space.
  // <View style={styles.container}> creates a container for the entire content of the app. The styles.container style is applied here.
  // <Text style={styles.title}>Sea Prayer Times</Text> renders the title of the app using the styles.title style.
  // <View style={styles.section}> wraps the section containing various pieces of information. The styles.section style is applied here.
  // <View> creates a container for displaying the prayer times.
  // Inside this container, a series of sub-containers are created for each prayer time using the styles.pSection style.
  // Each sub-container contains a <View> for the prayer name and description, followed by a <Text> displaying the actual prayer time fetched from the state variables.
    return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Sea Prayer Times</Text>
        <View style={styles.section}>
          <Text style={styles.mTextTime}>
            {tLatitudes} L, {tLongitudes} B 
          </Text>
          <Text style={styles.bTextTime}>{tTimes}</Text> // These lines display latitude and longitude, current time, and current date. 
          <Text style={styles.mTextTime}>{tDates}</Text> // The values for these variables are dynamically inserted using the curly braces {}. Styles like styles.mTextTime and styles.bTextTime are applied to format the text. 
        </View>
        <View>
          <View style={styles.pSection}>
            <View>
              <Text style={styles.mTextPrayer}>Fajr</Text>
              <Text>Sholat Subuh</Text>
            </View>
            <Text style={styles.bTextPrayer}>{tPrayerTimes.Fajr}</Text>
          </View>
          <View style={styles.pSection}>
            <View>
              <Text style={styles.mTextPrayer}>Dhuhr</Text>
              <Text>Sholat Duhur</Text>
            </View>
            <Text style={styles.bTextPrayer}>{tPrayerTimes.Dhuhr}</Text>
          </View>
          <View style={styles.pSection}>
            <View>
              <Text style={styles.mTextPrayer}>Asr</Text>
              <Text>Sholat Ashar</Text>
            </View>
            <Text style={styles.bTextPrayer}>{tPrayerTimes.Asr}</Text>
          </View>
          <View style={styles.pSection}>
            <View>
              <Text style={styles.mTextPrayer}>Maghrib</Text>
              <Text>Sholat Maghrib</Text>
            </View>
            <Text style={styles.bTextPrayer}>{tPrayerTimes.Maghrib}</Text>
          </View>
          <View style={styles.pSection}>
            <View>
              <Text style={styles.mTextPrayer}>Isha</Text>
              <Text>Sholat Isya'</Text>
            </View>
            <Text style={styles.bTextPrayer}>{tPrayerTimes.Isha}</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

// container: This style is intended for the main container view.

// flex: 1: The container takes up all available space.
// paddingTop: Constants.statusBarHeight: Adds padding to the top of the container, accounting for the device's status bar height.
// backgroundColor: '#fff': Sets the background color to white.
// paddingHorizontal: 18: Adds horizontal padding of 18 units to the container.
// section: This style is meant for sections in the UI.

// marginTop: 60: Adds a top margin of 60 units.
// marginBottom: 60: Adds a bottom margin of 60 units.
// pSection: This style is intended for subsections within a section.

// marginTop: 10: Adds a top margin of 10 units.
// flexDirection: 'row': Sets the direction of child elements to be horizontal.
// justifyContent: 'space-between': Positions child elements with space between them.
// alignItems: 'center': Aligns child elements along the center vertically.
// title: This style is for titles.

// margin: 24: Adds a margin of 24 units.
// fontSize: 20: Sets the font size to 20 units.
// fontWeight: 'bold': Sets the font weight to bold.
// textAlign: 'center': Centers the text horizontally.
// bTextTime: This style is for large text related to time.

// fontSize: 76: Sets the font size to 76 units.
// fontWeight: 'bold': Sets the font weight to bold.
// textAlign: 'center': Centers the text horizontally.
// mTextTime: This style is for medium-sized text related to time.

// fontSize: 18: Sets the font size to 18 units.
// textAlign: 'center': Centers the text horizontally.
// bTextPrayer: This style is for large bold text related to prayer.

// fontSize: 40: Sets the font size to 40 units.
// fontWeight: 'bold': Sets the font weight to bold.
// textAlign: 'right': Aligns the text to the right.
// mTextPrayer: This style is for medium-sized bold text related to prayer.

// fontSize: 25: Sets the font size to 25 units.
// fontWeight: 'bold': Sets the font weight to bold.
// textAlign: 'left': Aligns the text to the left.

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#fff',
    paddingHorizontal: 18,
  },
  section: {
    marginTop: 60,
    marginBottom: 60,
  },
  pSection: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    margin: 24,
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  bTextTime: {
    fontSize: 76,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  mTextTime: {
    fontSize: 18,
    textAlign: 'center',
  },
  bTextPrayer: {
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'right',
  },
  mTextPrayer: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'left',
  },
});
