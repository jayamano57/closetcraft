import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../styles/colors';

interface BannerButtonProps {
  title: string;
  onPress: () => void;
}

function BannerButton({ title, onPress }: BannerButtonProps) {
  return (
    <TouchableOpacity style={buttonStyles.button} onPress={onPress}>
      <Text style={buttonStyles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

export function HomeBanner({ onPress, buttonTitle }) {
  return (
    <View style={styles.container}>
      <ImageBackground
        style={styles.imageBackground}
        resizeMode="cover"
        source={require('../../../../assets/plant.jpg')}
      >
        <Text style={styles.text}>Create an oufit!</Text>
        <BannerButton onPress={onPress} title={buttonTitle} />
      </ImageBackground>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    overflow: 'hidden',
    borderRadius: 16,
    backgroundColor: COLORS.black_90,
    // justifyContent: 'center',
  },
  imageBackground: {
    paddingHorizontal: 16,
    paddingVertical: 24,
  },
  text: { fontSize: 20, marginBottom: 48, fontWeight: '700' },
});

const buttonStyles = StyleSheet.create({
  button: {
    alignSelf: 'flex-start',
    borderRadius: 8,
    backgroundColor: COLORS.black_0,
    paddingVertical: 10,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: COLORS.white_100,
  },
});
