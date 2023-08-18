// The code starts by importing necessary modules from the React and React Native libraries.
// The * as React import brings in the entirety of the React library and binds it to the variable name React.
// Text, View, StyleSheet, and Image are specific components and utilities imported from the react-native library. These will be used to build the user interface.

import * as React from 'react';
import { Text, View, StyleSheet, Image } from 'react-native';

// This line defines a default export of a functional React component named AssetExample. This component is created using a function declaration syntax.
export default function AssetExample() {

  // This is the main content of the AssetExample component, defined within the curly braces. It returns JSX (JavaScript XML) which describes the structure and content of the component.
  // <View> is a container component that provides structure to the layout. It uses the container style defined in the styles object.
  // Inside the <View>, there's a <Text> component that displays the specified message. It uses the paragraph style.
  // Following the <Text>, there's an <Image> component that displays an image. The source prop uses require('../assets/snack-icon.png') to load an image from the specified path.
  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>
        Local files and assets can be imported by dragging and dropping them into the editor
      </Text>
      <Image style={styles.logo} source={require('../assets/snack-icon.png')} />
    </View>
  );
}

// This block of code defines the styles object using StyleSheet.create(). It contains various style definitions used by the components within the AssetExample component.
// container styles are applied to the <View> component, setting its alignment, justification, and padding.
// paragraph styles are applied to the <Text> component, affecting its margins, font size, weight, and text alignment.
// logo styles are applied to the <Image> component, setting its height and width.
const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  paragraph: {
    margin: 24,
    marginTop: 0,
    fontSize: 14,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  logo: {
    height: 128,
    width: 128,
  }
});
