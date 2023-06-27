import { Image } from 'react-native';
import { StyleSheet } from 'react-native';

interface CCLogoProps {
  width?: number;
  fullHeight?: boolean;
}

export function CCLogo({ width = 225, fullHeight = false }: CCLogoProps) {
  return (
    <Image
      style={[
        styles.image,
        { width },
        fullHeight ? { height: '100%' } : undefined,
      ]}
      source={require('../../../assets/cc-name-md.png')}
    />
  );
}

export const styles = StyleSheet.create({
  image: {
    resizeMode: 'contain',
  },
});
