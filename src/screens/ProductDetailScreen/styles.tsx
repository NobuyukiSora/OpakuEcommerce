import {StyleSheet} from 'react-native';

export const createStyles = (
  Metrics: any,
  themeColors: any,
) =>
  StyleSheet.create({
      container: {flex: 1, backgroundColor: themeColors.background},
      image: {
        width: Metrics.screenWidth,
        height: 250,
        borderRadius: Metrics[8],
        marginRight: Metrics[8],
        resizeMode: 'contain',
      },
      title: {fontSize: Metrics[24], fontWeight: 'bold'},
      price: {
        fontSize: Metrics[20],
        color: 'green',
        fontWeight: 'bold',
        marginVertical: 5,
      },
      reviewTitle: {
        fontSize: Metrics[16],
        fontWeight: 'bold',
        marginTop: Metrics[20],
      },
      reviewItem: {
        padding: Metrics[8],
        borderBottomWidth: 1,
        borderBottomColor: themeColors.backgroundSecondary,
      },
      reviewer: {fontWeight: 'bold'},
      detailContainer: {
        backgroundColor: themeColors.backgroundSecondary,
        marginHorizontal: Metrics[12],
        padding: Metrics[12],
        borderRadius: Metrics[12],
        marginVertical: Metrics[4],
      },
    });
