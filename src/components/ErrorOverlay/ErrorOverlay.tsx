import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../Button/Button';
import { COLORS } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { CCLogo } from '../CCLogo/CCLogo';

interface ErrorOverlayProps {
  message: string;
}

export function ErrorOverlay({ message }: ErrorOverlayProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <View style={styles.logoContainer}>
          <CCLogo />
        </View>
        <Text style={styles.message}>{message}</Text>
      </View>

      <Button title="Go home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 32,
    paddingVertical: 64,
    backgroundColor: COLORS.white_100,
    flex: 1,
  },
  body: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    marginBottom: 96,
  },
  logoContainer: {
    marginBottom: 56,
  },
  message: {
    fontSize: 16,
  },
});
