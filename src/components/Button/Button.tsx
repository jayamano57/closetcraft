import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles/colors';

interface ButtonProps {
  title: string;
  onPress: () => void;
  disabled?: boolean;
}

export function Button({ title, disabled, onPress }: ButtonProps) {
  return (
    <TouchableOpacity
      style={[styles.button, disabled ? styles.disabled : undefined]}
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={styles.text}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    justifyContent: 'center',
    alignItems: 'center',
    minWidth: '100%',
    width: '100%',
    paddingVertical: 20,
    borderRadius: 40,
    backgroundColor: COLORS.black_0,
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontSize: 16,
    color: COLORS.white_100,
  },
});
