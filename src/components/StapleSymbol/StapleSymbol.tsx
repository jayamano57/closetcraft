import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';

interface StapleSymbolProps {
  onPress?: () => void;
  staple: boolean;
  size?: number;
  readonly?: boolean;
}

export function StapleSymbol({
  onPress,
  staple,
  size = 24,
  readonly = false,
}: StapleSymbolProps) {
  const handleOnPress = () => {
    if (!onPress) return;
    onPress();
  };
  return (
    <TouchableOpacity onPress={handleOnPress} disabled={readonly}>
      {staple ? (
        <Ionicons name="heart" size={size} color={COLORS.red_70} />
      ) : readonly ? null : (
        <Ionicons name="heart-outline" size={size} />
      )}
    </TouchableOpacity>
  );
}
