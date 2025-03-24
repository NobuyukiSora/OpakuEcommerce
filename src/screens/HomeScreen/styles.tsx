import {StyleSheet} from 'react-native';

export const createStyles = (Metrics: any, insets: any, themeColors: any) =>
  StyleSheet.create({
    container: {
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      flex: 1,
      paddingHorizontal: Metrics[16],
      backgroundColor: themeColors.background,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingVertical: Metrics[12],
    },
    title: {
      fontSize: Metrics[16],
      fontWeight: 'bold',
    },
    productItem: {
      padding: Metrics[8],
      marginVertical: Metrics[8],
      borderRadius: Metrics[12],
      backgroundColor: themeColors.backgroundSecondary,
      width: (Metrics.screenWidth - Metrics[50]) * 0.5,
    },
    productName: {
      fontSize: Metrics[16],
      fontWeight: '600',
    },
    productPrice: {
      fontSize: Metrics[16],
      color: 'gray',
    },
    sideViewContainer: {
      flex: 1,
      backgroundColor: themeColors.background,
      justifyContent: 'flex-end',
      padding: Metrics[12],
      paddingTop: insets.Top,
      paddingBottom: insets.Bottom,
      width: 300
    },
  });
