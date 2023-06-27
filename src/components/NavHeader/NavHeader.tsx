import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/core';
import { COLORS } from '../../styles/colors';
import { Text } from 'react-native';
import { CCLogo } from '../CCLogo/CCLogo';

interface NavHeaderProps {
  absolute?: boolean;
  title?: string;
  right?: JSX.Element;
  showLogo?: boolean;
  onLeftPress?: () => void;
}

export function NavHeader({
  absolute = false,
  title,
  right,
  showLogo,
  onLeftPress,
}: NavHeaderProps) {
  const navigation = useNavigation();

  return (
    <View
      style={[
        styles.navHeaderContainer,
        absolute ? styles.absolute : styles.relative,
      ]}
    >
      <TouchableOpacity
        style={styles.goBackButton}
        onPress={() => (onLeftPress ? onLeftPress() : navigation.goBack())}
      >
        <Feather name="chevron-left" size={30} color="black" />
      </TouchableOpacity>
      {title ? <Text style={styles.title}>{title}</Text> : null}
      {showLogo && !title ? <CCLogo width={150} fullHeight /> : null}
      {right ? right : null}
    </View>
  );
}

const styles = StyleSheet.create({
  navHeaderContainer: {
    width: '100%',
    paddingHorizontal: 8,
    paddingTop: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  relative: { position: 'relative', backgroundColor: COLORS.white_100 },
  absolute: { position: 'absolute', backgroundColor: 'transparent' },
  goBackButton: {
    height: 32,
    width: 32,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: COLORS.white_100,
  },
  title: {
    fontSize: 16,
  },
});
