import { StyleSheet, View } from 'react-native';
import { ScreenLayout } from '../layout';
import { Item, ItemPosition } from '../../services/item/item.types';
import React, { useState } from 'react';

import { Carousel } from '../../components/Carousel/Carousel';
import { Button } from '../../components/Button/Button';

export function CreateOutfit({ navigation, route }) {
  const { items }: { items: Item[] } = route.params;

  const headItems = items.filter((item) => item.position === ItemPosition.HEAD);
  const topItems = items.filter((item) => item.position === ItemPosition.TOP);
  const bottomItems = items.filter(
    (item) => item.position === ItemPosition.BOTTOM
  );
  const feetItems = items.filter((item) => item.position === ItemPosition.FEET);

  const [headItem, setHeadItem] = useState(null);
  const [topItem, setTopItem] = useState(null);
  const [bottomItem, setBottomItem] = useState(null);
  const [feetItem, setFeetItem] = useState(null);

  const onNext = () => {
    const outfitItems = [];

    if (headItem) outfitItems.push(headItem);
    if (topItem) outfitItems.push(topItem);
    if (bottomItem) outfitItems.push(bottomItem);
    if (feetItem) outfitItems.push(feetItem);

    navigation.navigate('OutfitDetails', { items: outfitItems });
  };

  return (
    <ScreenLayout
      scroll={false}
      action={<Button onPress={onNext} title="Next" />}
    >
      <View style={styles.container}>
        {headItems.length > 0 ? (
          <Carousel items={headItems} onItemSnap={setHeadItem} />
        ) : null}
        {topItems.length > 0 ? (
          <Carousel items={topItems} onItemSnap={setTopItem} />
        ) : null}
        {bottomItems.length > 0 ? (
          <Carousel items={bottomItems} onItemSnap={setBottomItem} />
        ) : null}
        {feetItems.length > 0 ? (
          <Carousel items={feetItems} onItemSnap={setFeetItem} />
        ) : null}
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginVertical: 24,
    gap: 8,
  },
});
