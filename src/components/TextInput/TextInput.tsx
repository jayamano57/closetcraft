import {
  TextInput as RNTextInput,
  StyleProp,
  StyleSheet,
  TextInputProps as RNTextInputProps,
  TextStyle,
} from 'react-native';
import { COLORS } from '../../styles/colors';
import { useMemo } from 'react';

interface TextInputProps {
  onChangeText: (text: string) => void;
  value: string;
  inputStyles?: StyleProp<TextStyle>;
  size?: 'small' | 'medium' | 'large';
}

export function TextInput({
  onChangeText,
  value,
  inputStyles,
  size = 'medium',
  ...rest
}: TextInputProps & RNTextInputProps) {
  const fontSize = useMemo(() => {
    if (size === 'small') return 16;
    if (size === 'medium') return 24;
    if (size === 'large') return 32;

    return 24;
  }, [size]);

  return (
    <RNTextInput
      selectionColor={COLORS.black_0}
      style={[styles.input, { fontSize }, inputStyles]}
      onChangeText={onChangeText}
      value={value}
      {...rest}
    />
  );
}

const styles = StyleSheet.create({
  input: {
    width: '100%',
    borderRadius: 4,
    paddingHorizontal: 4,
    paddingVertical: 8,
    borderWidth: 0.5,
    borderColor: COLORS.black_70,
  },
});
