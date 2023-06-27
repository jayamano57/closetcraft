import { Dimensions, Image, StyleSheet, Text, View } from 'react-native';
import React, { useCallback, useState } from 'react';
import Animated, {
  interpolate,
  Extrapolate,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';
import { COLORS } from '../../styles/colors';
import { IMAGE_ASPECT_RATIO } from '../../../constants';
import { Item } from '../../services/item/item.types';

interface CarouselItemProps {
  imageUri: string;
  scrollX: number;
  index: number;
  itemWidth: number;
}

interface CarouselProps {
  items: Item[];
  onItemSnap: (item: Item) => void;
}

interface Spacer {
  id: string;
  key: string;
  spacer: boolean;
}

const SCREEN_WIDTH = Dimensions.get('window').width;

function SpacerItem({ length }: { length: number }) {
  return <View style={{ width: length - 16 }} />;
}

function CarouselItem({
  imageUri,
  scrollX,
  index,
  itemWidth,
}: CarouselItemProps) {
  const scale = useSharedValue(0.8);

  const inputRange = [
    (index - 2) * itemWidth,
    (index - 1) * itemWidth,
    index * itemWidth,
  ];

  scale.value = interpolate(
    scrollX,
    inputRange,
    [0.8, 1, 0.8],
    Extrapolate.CLAMP
  );

  const animatedInnerStyles = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  return (
    <View style={carouselItemStyles.outer}>
      <Animated.View style={[carouselItemStyles.inner, animatedInnerStyles]}>
        <Image source={{ uri: imageUri }} style={carouselItemStyles.image} />
      </Animated.View>
    </View>
  );
}

export function Carousel({ items, onItemSnap }: CarouselProps) {
  const [carouselItemWidth, setCarouselItemWidth] = useState(0);
  const leftSpacer = { id: 'left-spacer-id', spacer: true, key: 'left-spacer' };
  const rightSpacer = {
    id: 'right-spacer-id',
    spacer: true,
    key: 'right-spacer',
  };

  const itemsWithSpacers: (Item | Spacer)[] = [
    leftSpacer,
    ...items,
    rightSpacer,
  ];

  const [scrollX, setScrollX] = useState(0);

  const onViewableItemsChanged = useCallback(({ viewableItems, changed }) => {
    let item: Item;

    const isFirst = !!viewableItems[0].item.spacer;
    const isLast = !!viewableItems[viewableItems.length - 1].item.spacer;

    if (isFirst) {
      item = viewableItems[1]?.item;
    } else if (isLast) {
      item = viewableItems[viewableItems.length - 2]?.item;
    } else {
      item = viewableItems[1]?.item;
    }

    onItemSnap(item);
  }, []);

  return (
    <View
      style={carouselStyles.carousel}
      onLayout={(event) => {
        const carouselHeight = event.nativeEvent.layout.height;
        setCarouselItemWidth(carouselHeight);
      }}
    >
      <Animated.FlatList
        scrollEventThrottle={16}
        showsHorizontalScrollIndicator={false}
        decelerationRate={0}
        contentContainerStyle={carouselStyles.listStyles}
        // snapToInterval={carouselItemWidth}
        snapToInterval={carouselItemWidth}
        onViewableItemsChanged={onViewableItemsChanged}
        horizontal
        data={itemsWithSpacers}
        renderItem={({ item, index }) => {
          if ((item as Spacer).spacer)
            return (
              <SpacerItem
                length={(SCREEN_WIDTH - carouselItemWidth) / 2 + 16}
              />
            );
          return (
            <CarouselItem
              imageUri={(item as Item).image.uri}
              scrollX={scrollX}
              index={index}
              itemWidth={carouselItemWidth}
            />
          );
        }}
        keyExtractor={(item) => item.id}
        onScroll={(event) => {
          setScrollX(event.nativeEvent.contentOffset.x);
        }}
      />
    </View>
  );
}

const carouselStyles = StyleSheet.create({
  carousel: {
    flex: 1,
    maxHeight: 300,
  },
  listStyles: {
    alignItems: 'center',
  },
});

const carouselItemStyles = StyleSheet.create({
  outer: {},
  inner: {
    aspectRatio: IMAGE_ASPECT_RATIO,
    overflow: 'hidden',
    borderRadius: 8,
    backgroundColor: COLORS.black_90,
  },
  image: {
    height: '100%',
    width: '100%',
    resizeMode: 'cover',
  },
});

const spacerStyles = StyleSheet.create({});
