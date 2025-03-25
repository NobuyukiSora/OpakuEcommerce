import {StyleSheet} from 'react-native';

export const createStyles = (Metrics: any, insets: any, themeColors: any) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: themeColors.background,
      padding: Metrics[12],
      paddingTop: insets.top,
      paddingBottom: insets.bottom,
      justifyContent: 'flex-end',
      alignItems: 'center',
    },
    title: {
      fontSize: Metrics[20],
      fontWeight: 'bold',
      marginBottom: Metrics[20],
    },
    buttonLogin: {
      flexDirection: 'row',
      alignItems: 'center',
      borderWidth: Metrics[2],
      borderColor: themeColors.textSecondary,
      paddingVertical: Metrics[8],
      paddingHorizontal: Metrics[20],
      borderRadius: Metrics[8],
      gap: Metrics[12],
    },
    imageContainer: {
      padding: Metrics[12],
      flex: 1,
      justifyContent: 'center',
    },
  });
