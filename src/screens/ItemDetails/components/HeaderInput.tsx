import { useEffect, useRef } from 'react';
import { TextInput } from 'react-native';
import { COLORS } from '../../../styles/colors';

interface HeaderInputProps {
  value: string;
  onChangeText: (value: string) => void;
  placeholder?: string;
}

export function HeaderInput({
  value,
  onChangeText,
  placeholder,
}: HeaderInputProps) {
  const textInputRef = useRef<TextInput>();

  useEffect(() => {
    if (textInputRef.current) textInputRef.current.focus();
  }, [textInputRef]);

  return (
    <TextInput
      ref={textInputRef}
      selectionColor={COLORS.black_0}
      onChangeText={onChangeText}
      value={value}
      placeholder={placeholder}
      style={{
        fontSize: 24,
        marginTop: 16,
        marginBottom: 24,
      }}
    />
  );
}
