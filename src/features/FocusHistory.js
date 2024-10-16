import * as React from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { colors } from '../utils/colors';
import { fontSizes, spacing } from '../utils/sizes';

// A component definition?
export const FocusHistory = ({ history }) => {
  if (!history || !history.length)
    return <Text style={styles.title}>You haven't focused on anything yet</Text>;

  //For FlatList
  const renderItem = ({ item }) => <Text style={styles.item}>~ {item}</Text>;

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Things we have focused on:</Text>
      <FlatList data={history} renderItem={renderItem} />
    </View>
  );
};

const styles = StyleSheet.create({
  title: {
    color: colors.white,
    fontSize: fontSizes.md,
    textAlign: 'center',
    fontWeight: 'bold',
    padding: spacing.md,
  },
  item: {
    fontSize: fontSizes.md,
    color: colors.white,
    paddingTop: spacing.md,
  },
  container: {
    padding: spacing.md,
    flex: 1,
  },
});
