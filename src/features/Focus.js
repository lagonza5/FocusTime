/*
As is, only the Function component knows about the text the user has input. The parent component, the 'App' component does not know about it and thus cannot use it.
*/

import * as React from 'react';
import { View, StyleSheet, Platform, StatusBar } from 'react-native';
import { TextInput } from 'react-native-paper';
import { colors } from '../utils/colors';
import { RoundedButton } from '../components/RoundedButton';
import { fontSizes, spacing } from '../utils/sizes'

// Assigning an anonymous function to a variable.
export const Focus = ({addSubject}) => {

  //The hook
  const [subject, setSubject] = React.useState(null);
  
  //To confirm that the user input is being saved into variable 'subject'
  console.log(subject);
  return (
    <View style={styles.container}>

      {/*
      imported from react-native-paper, great library
      https://callstack.github.io/react-native-paper/docs/components/TextInput/
      */}
      <View style={styles.input_button_Container}>

        <TextInput
          label="What would you like to focus on?"
          onChangeText={(input_text) => {
            setSubject(input_text); //call-back function called when input changes.
          }}
          //custom styles
          style={styles.textInput}
        />

        {/* Wrapping a View around the button. If you don't, the style props for the button
        will only apply to what is going on inside the button and not to its style within its 
        parent container.
        */}
        <View style={styles.button}>
          <RoundedButton
            title="+"
            size={50}
            onPress={() => addSubject(subject)}
          />
        </View>
        
      </View>

    </View>
  );
};
// The React Hook useState must be implemented in order to save the text the user is entering. It takes the form of:
// Declaring an array of variables: the first one being the field/attribute and the second one being a reference to the function that sets the first.

//Pass it an object of objects
const styles = StyleSheet.create({
  //First layer component (not including iOS SafeAreaView)
  //Avoiding the status bar on Android devices. I added a View component inside of the SafeAreaView component because on Android devices the SafeAreaView doesn't apply and it falls back to a View component.
  //For iOS the View component will be nested inside the SafeAreaView component and these styles will apply unless they are Platform specific.
  container: {
    //no flex means it will only take up the space it needs
    backgroundColor: colors.gold, // gold
    paddingTop: Platform.OS == 'android' ? StatusBar.currentHeight : 0,
  },
  //Second layer component(s)
  // Container currently contains the text input and the rounded button
  //The Textfield component we imported from react-native-paper
  //Don't add a flex: 1 here because the row will take up the entire screen.
  input_button_Container: {
    padding: spacing.lg, // padding repositions the component from all directions.
    justifyContent: 'top', // within its own view
    flexDirection: 'row',
  },
  textInput: {
    flex: 1, // take up as much space as required, leave room for any other component(s)
    marginRight: spacing.md, //to provide space between input and button
  },
  //Third layer component
  //Since the button is its own nested component, we don't want the parent component input_button_Container to push the button to the top of that container, so we justify the element to the center of this parent container.
  button: {
    justifyContent: 'center',
  }
});

//Components nested at the same level can use 'flex' to describe how much of the screen they occupy. Their number values will be used to calculate a ratio that describes how much space they occupy depending on how many components are nested at that same level. JustifyContent can then modify the components place even further within that occupied space.
