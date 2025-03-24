import type { TextStyle, TouchableOpacityProps } from 'react-native';
import { PropsTypograph } from '../Typograph/props';

export interface PropsButton extends TouchableOpacityProps {
  title?: string;
  customStyleButton?: TextStyle;
  customStyleTitle?: TextStyle;
  vibrate?: boolean;
  vibrateDuration?: number;
  propsTypograph?: PropsTypograph;
}
