import { StyleSheet, Text, View } from 'react-native';
import { CCLogo } from '../../components/CCLogo/CCLogo';
import { Button } from '../../components/Button/Button';

interface LandingProps {
  onGetStarted: () => void;
}

export function Landing({ onGetStarted }: LandingProps) {
  return (
    <View style={styles.container}>
      <View style={styles.body}>
        <Text>Welcome to</Text>
        <CCLogo />
      </View>
      <Button title="Get Started" onPress={onGetStarted} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
  body: {
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
});
