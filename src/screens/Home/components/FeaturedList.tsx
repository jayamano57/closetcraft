import {
  FlatList,
  StyleSheet,
  Text,
  Image,
  TouchableOpacity,
  View,
} from 'react-native';
import { COLORS } from '../../../styles/colors';
import { useNavigation } from '@react-navigation/core';
import { Item } from '../../../services/item/item.types';

interface FeaturedItemProps {
  item: Item;
}

interface FeaturedListHeader {
  title: string;
  action?: JSX.Element;
}

interface FeaturedListProps {
  items: Item[];
}

function FeaturedItem({ item }: FeaturedItemProps) {
  const navigation = useNavigation<any>();

  const goToItemView = () => {
    navigation.navigate('Item', { id: item.id });
  };

  return (
    <TouchableOpacity
      style={featuredListStyles.featuredItem}
      onPress={goToItemView}
    >
      <Image
        style={featuredListStyles.image}
        source={{ uri: item.image.uri }}
      />
    </TouchableOpacity>
  );
}

function FeaturedListHeader({ title, action }: FeaturedListHeader) {
  return (
    <View style={featuredListStyles.featuredListHeaderContainer}>
      <Text style={featuredListStyles.featuredListHeader}>{title}</Text>
      {action ? action : null}
    </View>
  );
}

export function FeaturedList({ items }: FeaturedListProps) {
  const navigation = useNavigation();

  return (
    <View style={featuredListStyles.featuredListContainer}>
      <FeaturedListHeader
        title="Peek into my closet"
        action={
          <TouchableOpacity onPress={() => navigation.navigate('My Closet')}>
            <Text>See all</Text>
          </TouchableOpacity>
        }
      />
      <FlatList
        showsHorizontalScrollIndicator={false}
        horizontal
        contentContainerStyle={{ paddingHorizontal: 16 }}
        data={items.slice(0, 5)}
        renderItem={({ item }) => <FeaturedItem item={item} />}
        keyExtractor={(item) => item.id}
      />
    </View>
  );
}

const featuredListStyles = StyleSheet.create({
  featuredListContainer: {
    marginTop: 16,
  },
  featuredListHeaderContainer: {
    flexDirection: 'row',
    alignItems: 'flex-end',
    justifyContent: 'space-between',
    marginBottom: 16,
    marginHorizontal: 16,
  },
  featuredListHeader: {
    fontSize: 16,
    fontWeight: '700',
    justifyContent: 'center',
  },
  featuredItem: {
    overflow: 'hidden',
    marginRight: 8,
    backgroundColor: COLORS.black_70,
    borderRadius: 72 / 2,
    height: 72,
    width: 72,
  },
  image: {
    width: '100%',
    height: '100%',
  },
});
