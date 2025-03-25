import {StyleSheet} from 'react-native';

export const createStyles = (Metrics: any, insets: any, themeColors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
      padding: Metrics[12],
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
    },
    title: {
      fontSize: Metrics[16],
      fontWeight: 'bold',
    },
    imageContainer: {
      padding: Metrics[12],
      flex: 1,
      justifyContent: 'center',
    },
    itemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      borderBottomWidth: 1,
      borderColor: themeColors.textSecondary,
    },
  });
