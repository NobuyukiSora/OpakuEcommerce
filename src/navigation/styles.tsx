import {StyleSheet} from 'react-native';

export const createStyles = (Metrics: any, insets: any, themeColors: any) =>
  StyleSheet.create({
    sideViewContainer: {
      flex: 1,
      backgroundColor: themeColors.background,
      justifyContent: 'flex-end',
      padding: Metrics[12],
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      width: 300,
    },
    logoutButton: {
      flexDirection: 'row',
      justifyContent: 'center',
      gap: Metrics[12],
      backgroundColor: themeColors.red,
      padding: Metrics[8],
      borderRadius: Metrics[8],
    },
    languageList: {
      justifyContent: 'center',
      width: 85,
      padding: Metrics[8],
      borderRadius: Metrics[8],
      margin: Metrics[2]
    }
  });
