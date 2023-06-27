import {
  Dimensions,
  StyleSheet,
  Text,
  View,
  useWindowDimensions,
} from 'react-native';
import { COLORS } from '../../styles/colors';
import BottomSheet, { BottomSheetScrollView } from '@gorhom/bottom-sheet';
import { useMemo, useRef, useState } from 'react';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { DetailsGroup } from './DetailsGroup';
import { Tag } from '../Tags/Tags';
import { Tag as TagType } from '../../services/tag/tag.types';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

export interface Detail {
  title: string;
  hide?: boolean;
  content: JSX.Element;
}

interface DetailsContainerProps {
  backgroundImage: JSX.Element;
  header: string;
  headerRight: JSX.Element;
  actions: JSX.Element[];
  tags: TagType[];
  details: Detail[];
}

export function DetailsContainer({
  backgroundImage,
  header,
  headerRight,
  actions,
  tags,
  details,
}: DetailsContainerProps) {
  const snapToPoint = 0.5;
  const position = useSharedValue(0);
  const { height: screenHeight, width: screenWidth } = useWindowDimensions();
  const { bottom: safeAreaBottomInset } = useSafeAreaInsets();

  const [headerHeight, setHeaderHeight] = useState('25%');

  const bottomSheetRef = useRef<BottomSheet>(null);

  const snapPoints = useMemo(
    () => [headerHeight, `${snapToPoint * 100}%`],
    [headerHeight]
  );

  const animatedStyles = useAnimatedStyle(() => {
    const headerHeightNum = parseFloat(headerHeight.split('%')[0]) / 100;
    const from = screenHeight - screenHeight * headerHeightNum;
    const to = screenHeight - screenHeight * snapToPoint;

    const opacity = interpolate(position.value, [from, to], [0, 1]);

    return {
      opacity,
    };
  });

  return (
    <View style={styles.container}>
      <View style={styles.background}>{backgroundImage}</View>
      <BottomSheet
        ref={bottomSheetRef}
        index={0}
        snapPoints={snapPoints}
        animatedPosition={position}
      >
        <BottomSheetScrollView
          contentContainerStyle={styles.itemDetailsContainer}
        >
          <View style={styles.body}>
            <View
              style={styles.header}
              onLayout={({ nativeEvent }) => {
                const { height: headerHeight } = nativeEvent.layout;
                const handleHeight = 24;
                const peakHeight =
                  headerHeight + handleHeight + safeAreaBottomInset;

                if (peakHeight === 0) return;

                setHeaderHeight(`${(peakHeight / screenHeight) * 100}%`);
              }}
            >
              <Text style={styles.name}>{header}</Text>
              {headerRight ? headerRight : null}
            </View>

            <Animated.View style={animatedStyles}>
              <View>
                <View style={styles.actions}>
                  {actions.map((action, i) => (
                    <View key={i}>{action}</View>
                  ))}
                </View>

                {tags && tags.length > 0 ? (
                  <View style={styles.tags}>
                    {tags.map((t) => (
                      <Tag key={t.id} tagName={t.name} />
                    ))}
                  </View>
                ) : null}

                {details.map((detail, index) =>
                  detail.hide ? null : (
                    <DetailsGroup
                      key={index}
                      title={detail.title}
                      content={detail.content}
                    />
                  )
                )}
              </View>
            </Animated.View>
          </View>
        </BottomSheetScrollView>
      </BottomSheet>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: COLORS.black_90, flex: 1 },
  background: {
    height: SCREEN_HEIGHT,
    width: SCREEN_WIDTH,
  },

  itemDetailsContainer: {
    paddingHorizontal: 16,
    paddingBottom: 24,
  },
  body: {
    paddingBottom: 72,
  },
  header: {
    paddingTop: 12,
    paddingBottom: 8,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  name: {
    fontWeight: '700',
    fontSize: 24,
  },
  descriptionContainer: {},
  description: {
    fontSize: 12,
    color: COLORS.black_40,
  },
  actions: {
    paddingBottom: 32,
    flexDirection: 'row',
    gap: 12,
  },
  tags: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingBottom: 16,
  },
  detailsContainer: {},
  detailContainer: {
    marginBottom: 16,
  },
  detailLabel: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
});
