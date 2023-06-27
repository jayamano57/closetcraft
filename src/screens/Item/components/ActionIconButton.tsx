import { StyleSheet, TouchableOpacity } from 'react-native';
import { COLORS, Colors } from '../../../styles/colors';

interface ActionButtonIconProps {
  onPress: () => void;
  icon: JSX.Element;
  color: string;
  size: number;
}

const DEFAULT_SIZE = 20;

export function ActionIconButton({
  onPress,
  icon,
  color = COLORS.black_90,
  size,
}: ActionButtonIconProps) {
  const buttonSize = size ?? DEFAULT_SIZE;

  return (
    <TouchableOpacity
      onPress={onPress}
      style={[
        styles.button,
        {
          backgroundColor: color,
          borderRadius: buttonSize / 2,
          height: buttonSize,
          width: buttonSize,
        },
      ]}
    >
      {icon}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});
