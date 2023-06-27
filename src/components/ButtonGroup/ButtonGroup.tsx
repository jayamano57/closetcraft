import {
  StyleProp,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
  ViewStyle,
} from 'react-native';
import { COLORS } from '../../styles/colors';

interface ButtonGroupProps {
  selectedIndex: number;
  onPress: (index: number) => void;
  buttons: JSX.Element[];
  buttonStyles: StyleProp<ViewStyle>;
}

export function ButtonGroup({
  selectedIndex,
  onPress,
  buttons,
  buttonStyles,
}: ButtonGroupProps) {
  return (
    <View style={styles.buttonGroup}>
      {buttons.map((b, i) => (
        <TouchableWithoutFeedback key={i} onPress={() => onPress(i)}>
          <View
            style={[
              styles.button,
              buttonStyles,
              i === selectedIndex ? styles.selected : styles.unselected,
            ]}
          >
            {b}
          </View>
        </TouchableWithoutFeedback>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  button: {
    backgroundColor: COLORS.white_100,
  },
  selected: {
    borderColor: COLORS.black_0,
    borderWidth: 2,
  },
  unselected: {
    borderWidth: 2,
    borderColor: COLORS.black_90,
  },
});
