import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, ScrollView } from 'react-native';
import Constants from 'expo-constants';

import * as Location from 'expo-location';

// You can import from local files
// import AssetExample from './components/AssetExample';

export default function App() {
  const [times, setTimes] = useState(null);
  const [dates, setDates] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [latitude, setLatitude] = useState(null);
  const [prayerTimes, setPrayerTimes] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  // Get the current LOCATION (Latitude & Longitude)
  useEffect(() => {
    (async () => {
      // Get device permission for access location
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        setErrorMsg('Permission to access location was denied');
        return;
      }

      // Get times for clock
      const timer = setInterval(() => {
        // Get times
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
      const response = await fetch(
        `http://api.aladhan.com/v1/calendar?latitude=${latitude}&longitude=${longitude}&method=2`
      );
      const data = await response.json();
      setPrayerTimes(data.data[now.getDate() - 1]);

      console.log(data.data[now.getDate() - 1]);

      return () => clearInterval(timer);
    })();
  }, []);

  // Variables declaration
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

  return (
    <ScrollView>
      <View style={styles.container}>
        <Text style={styles.title}>Sea Prayer Times</Text>
        <View style={styles.section}>
          <Text style={styles.mTextTime}>
            {tLatitudes} L, {tLongitudes} B
          </Text>
          <Text style={styles.bTextTime}>{tTimes}</Text>
          <Text style={styles.mTextTime}>{tDates}</Text>
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
