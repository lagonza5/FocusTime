import * as React from 'react';
import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  StatusBar,
} from 'react-native';
import { colors } from './src/utils/colors.js';
import { Focus } from './src/features/Focus';
import { Timer } from './src/features/Timer';
import { FocusHistory } from './src/features/FocusHistory'

// Parent component for the entire application.
// Can move the export default to the end of this file
export default function App() {
  //The hook
  const [currentSubject, setCurrentSubject] = React.useState(null);
  const [history, setHistory] = React.useState([]);

  return (
    <SafeAreaView style={styles.safeContainer}>
      {!currentSubject ? (
        <>
          <Focus addSubject={setCurrentSubject} />
          <FocusHistory history={history} />
        </>
      ) : (
        <Timer
          focusSubject={currentSubject}
          onTimerEnd={(subject) => {
            setHistory([...history, subject]) //Add the newest item to the list.
          }}
          clearSubject={() => setCurrentSubject(null)}
        />
      )}
    </SafeAreaView>
  );
}

// Variable declaration
const styles = StyleSheet.create({
  //The restricted areas on iOS devices only (status bar/camera notch and bottom)
  // To use, wrap your top level view with a SafeAreaView with a flex: 1 style applied to it.
  safeContainer: {
    flex: 1,
    backgroundColor: colors.grey, // dark grey
    //This won't do anything for our Android device
    //You'll have to do other things for that
  },
});

// Move all color and text constants to their own files in a utils folder

/*
In order to pass/share the subject the user enters from the <Focus> feature/component to the <App> component on this file...

First add a call to the useState() hook on this file to focus on the current subject entered by user.
Second add a prop called 'addSubject' to the <Focus> feature/component on this file as well.
This prop will use setCurrentSubject that was created in the call to useState()

On the file for the <Focus> feature/component you will have to modify its declaration/definition so that it knows about the 'addSubject' prop created in this file. It will use the 'addSubject' prop in its RoundedButton component when the user presses the button.

*/
