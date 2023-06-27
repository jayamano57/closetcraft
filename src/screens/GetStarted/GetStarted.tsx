import { StyleSheet, View, useWindowDimensions } from 'react-native';
import { screenStyles } from '../styles';
import { Landing } from './Landing';
import { Name } from './Name';
import Animated, {
  Easing,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function GetStarted() {
  const insets = useSafeAreaInsets();

  const window = useWindowDimensions();
  const stepsTranslateY = useSharedValue(window.height);
  const stepsOpacity = useSharedValue(0);

  const landingAnimatedStyles = useAnimatedStyle(() => {
    const translateY = interpolate(
      stepsTranslateY.value,
      [window.height, 0],
      [0, -window.height]
    );

    const opacity = interpolate(
      stepsTranslateY.value,
      [window.height, window.height / 4],
      [1, 0]
    );

    return {
      opacity,
      transform: [{ translateY }],
    };
  });

  const animatedStyles = useAnimatedStyle(() => {
    return {
      opacity: stepsOpacity.value,
      transform: [{ translateY: stepsTranslateY.value }],
    };
  });

  const onGetStarted = () => {
    stepsTranslateY.value = withTiming(0, {
      duration: 1200,
      easing: Easing.bezier(0.25, 0.1, 0.25, 1),
    });

    stepsOpacity.value = withDelay(
      600,
      withTiming(1, {
        duration: 1200,
        easing: Easing.bezier(0.25, 0.1, 0.25, 1),
      })
    );
  };

  return (
    <View
      style={[
        screenStyles.container,
        screenStyles.content,
        { paddingBottom: insets.bottom },
      ]}
    >
      <Animated.View style={[landingAnimatedStyles]}>
        <Landing onGetStarted={onGetStarted} />
      </Animated.View>
      <Animated.View style={[styles.steps, animatedStyles]}>
        <Name />
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  steps: {
    ...StyleSheet.absoluteFillObject,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
