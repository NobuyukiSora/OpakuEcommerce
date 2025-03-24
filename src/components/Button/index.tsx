import * as React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Metrics, themeColors, Typograph } from 'soras-ui';
import type { PropsButton } from './props';

export const Button: React.FunctionComponent<PropsButton> = (props) => {
  const {
    title,
    onPress = () => {},
    customStyleButton = {},
    customStyleTitle = {},
    children,
    vibrate,
    vibrateDuration,
    propsTypograph,
    ...rest
  } = props;

  const styles = StyleSheet.create({
    title: {
      fontWeight: '800',
      textAlign: 'center',
    },
    button: {
      backgroundColor: themeColors.button,
      borderRadius: Metrics[8],
      justifyContent: 'center',
      padding: Metrics[16],
    },
  });

  return (
    <TouchableOpacity
      onPress={(set) => {
        onPress(set);
      }}
      {...rest}
    >
      <View
        style={[styles.button, customStyleButton]}
      >
        {!!children ? (
          children
        ) : (
          <Typograph
            customStyle={[
              styles.title,
              ...(customStyleTitle ? [customStyleTitle] : []),
            ]}
            {...propsTypograph}
          >
            {title}
          </Typograph>
        )}
      </View>
    </TouchableOpacity>
  );
};
