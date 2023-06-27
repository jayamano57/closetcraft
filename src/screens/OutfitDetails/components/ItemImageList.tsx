import { useNavigation } from '@react-navigation/native';
import { CameraCapturedPicture } from 'expo-camera';
import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { FlatList } from 'react-native';
import { COLORS } from '../../../styles/colors';
import { Text } from 'react-native';
import { IMAGE_ASPECT_RATIO } from '../../../../constants';

interface RenderItemProps {
  name: string;
  image: CameraCapturedPicture;
  id: string;
  viewable?: boolean;
  type: 'item' | 'outfit';
}

interface Item {
  name: string;
  image: CameraCapturedPicture;
  id: string;
}

interface ViewableImageListProps {
  type: 'item' | 'outfit';
  items: Item[];
  viewable?: boolean;
}

const ITEM_SIZE = 120;

function RenderItem({ name, image, id, viewable, type }: RenderItemProps) {
  const navigation = useNavigation();

  const handleOnPress = () => {
    if (!viewable) return;
    navigation.navigate(type === 'item' ? 'Item' : 'Outfit', { id });
  };

  return (
    <TouchableOpacity
      disabled={!viewable}
      onPress={handleOnPress}
      style={itemStyles.container}
    >
      {image ? (
        <Image source={{ uri: image.uri }} style={itemStyles.image} />
      ) : (
        <View style={itemStyles.noImage}>
          <Text style={itemStyles.name}>{name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

export function ViewableImageList({
  items,
  viewable,
  type,
}: ViewableImageListProps) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
      data={items}
      renderItem={({ item, index }) => (
        <RenderItem
          name={item.name}
          image={item.image}
          id={item.id}
          viewable={viewable}
          type={type}
        />
      )}
      keyExtractor={(item, index) => `${item.id}-${index}`}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: 'center',
  },
});

const itemStyles = StyleSheet.create({
  container: {
    aspectRatio: IMAGE_ASPECT_RATIO,
    marginRight: 8,
    height: ITEM_SIZE,
    width: ITEM_SIZE,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    borderRadius: 4,
    resizeMode: 'contain',
    height: '100%',
    width: '100%',
  },
  noImage: {
    height: '100%',
    width: '100%',
    borderRadius: 4,
    backgroundColor: COLORS.black_90,
    alignItems: 'center',
    justifyContent: 'center',
  },
  name: {
    fontSize: 16,
  },
});
