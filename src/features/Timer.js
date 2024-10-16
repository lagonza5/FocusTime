import * as React from 'react';
import { View, Text, StyleSheet, Vibration } from 'react-native';
import { ProgressBar } from 'react-native-paper';
import { useKeepAwake } from 'expo-keep-awake';
import { Countdown } from '../components/Countdown';
import { RoundedButton } from '../components/RoundedButton';
import { Timing } from './Timing'
import { fontSizes, spacing } from '../utils/sizes';
import { colors } from '../utils/colors.js';

/*
Props for the countdown component
({ minutes = 0.1, isPaused, onProgress, onEnd })
0.1 minutes is 6 seconds
*/

//Vibration pattern for iOS only, read docs for Android behavior.
const ONE_SECOND_IN_MS = 1000;
const PATTERN = [
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
  1 * ONE_SECOND_IN_MS,
];

export const Timer = ({ focusSubject, clearSubject, onTimerEnd }) => {

  useKeepAwake(); //add the dependency from 'expo-keep-awake'

  const [isStarted, setIsStarted] = React.useState(false);
  const [progressValue, setProgressValue] = React.useState(1); //default value of timer
  const [minutes, setMinutes] = React.useState(0.1);

  //Gets the reset function, as a variable, from the countdown component.
  const onEnd = (reset) => {
    Vibration.vibrate(PATTERN);
    setIsStarted(false);
    setProgressValue(1);
    reset();
    onTimerEnd(focusSubject); //pass it back up to app so it doesn't get erased.
  }

  return (
    <View style={styles.container}>
      <View style={styles.countdown}>
        {/*Must provide props to the Countdown element else it fails to render*/}
        <Countdown
          minutes={minutes} //self referencing
          isPaused={!isStarted}
          onProgress={(progressValue) => setProgressValue(progressValue)}
          onEnd={onEnd}
        />
        <View style={{ paddingTop: spacing.xxl }}>
          <Text style={styles.title}>Focusing on:</Text>
          <Text style={styles.focusSubject}>{focusSubject}</Text>
        </View>
      </View>

      <View style={{ paddingTop: spacing.sm }}>
        <ProgressBar
          progress={progressValue}
          color={colors.red}
          style={{ height: spacing.md }}
        />
      </View>

      <View style={styles.timingWrapper}>
        <Timing onChangeTime={setMinutes} />
      </View>      

      <View style={styles.buttonWrapper}>
        {!isStarted && (
          <RoundedButton size={125} title="start" onPress={() => setIsStarted(true)} />
        )}
        {isStarted && (
          <RoundedButton size={125} title="pause" onPress={() => setIsStarted(false)} />
        )}
      </View>

      <View style={styles.clearSubjectWrapper}>
        <RoundedButton size={100} title="-" onPress={clearSubject} />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'green',
  },
  countdown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center', // centered in the top half portion
    backgroundColor: 'yellow',
  },
  buttonWrapper: {
    flex: 0.3,
    flexDirection: 'row',
    padding: spacing.md,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'blue',
  },
  title: {
    color: colors.black,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  focusSubject: {
    color: colors.black,
    textAlign: 'center',
  },
  timingWrapper: {
    flex: 0.1,
    flexDirection: 'row',
    paddingTop: spacing.xxl,    
  },  
  clearSubjectWrapper: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
});

/*
To open up the button component, the definition for Timer was changed from:

  export const Timer = ({ focusSubject }) => (
    ...
  )

  to

  export const Timer = ({ focusSubject }) => {}
    return (

    );
  };

This allowed it to use the RoundedButton component that is defined in another file.
*/
