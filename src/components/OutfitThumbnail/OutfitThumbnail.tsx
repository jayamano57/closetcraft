import { useMemo } from 'react';
import { Image, StyleSheet, View } from 'react-native';
import { Item } from '../../services/item/item.types';

interface OutfitThumbnailProps {
  items: Item[];
  height?: number;
  width?: number;
}

export function OutfitThumbnail({
  items,
  height = 96,
  width = 96,
}: OutfitThumbnailProps) {
  // TODO: Programatically calculate these values
  const imageLayout = useMemo(() => {
    const itemsSize = items.length;
    switch (itemsSize) {
      case 1:
        return { rows: 1, cols: 1 };
      case 2:
        return { rows: 1, cols: 2 };
      case 3:
        return { rows: 2, cols: 2 };
      case 4:
        return { rows: 2, cols: 2 };
      case 5:
        return { rows: 3, cols: 3 };
    }

    console.warn('Need to handle more than current item count');
  }, []);

  return (
    <View style={styles.noImage}>
      {items.map((item, index) => (
        <Image
          key={index}
          source={{ uri: item.image.uri }}
          style={{
            height: height / imageLayout.rows,
            width: width / imageLayout.cols,
          }}
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  noImage: { flexDirection: 'row', flexWrap: 'wrap' },
});
