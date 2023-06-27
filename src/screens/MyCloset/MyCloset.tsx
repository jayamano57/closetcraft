import {
  FlatList,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { ScreenLayout } from '../layout';
import { useTags } from '../../services/tag/tag.hook';
import { Tags } from '../../components/Tags/Tags';
import { useEffect, useMemo, useState } from 'react';
import { useItems } from '../../services/item/item.hook';
import { COLORS } from '../../styles/colors';
import { useNavigation } from '@react-navigation/core';

import { Ionicons } from '@expo/vector-icons';
import { Button } from '../../components/Button/Button';
import { Item } from '../../services/item/item.types';
import { StapleSymbol } from '../../components/StapleSymbol/StapleSymbol';
import { useIsFocused } from '@react-navigation/native';
import { Tag } from '../../services/tag/tag.types';

interface ClosetItemProps {
  item: Item;
  id: string;
  selectMode: boolean;
  selected: boolean;
  onSelectItem: (item: Item) => void;
  hide?: boolean;
}

interface CancelButtonProps {
  onPress: () => void;
}

const CLOSET_ITEM_COLUMN_GAP = 4;
const COLUMN_COUNT = 3;

function ClosetItem({
  item,
  id,
  selectMode,
  selected,
  onSelectItem,
  hide,
}: ClosetItemProps) {
  const { width: screenWidth } = useWindowDimensions();
  const navigation = useNavigation();

  const onSeeItem = () => {
    navigation.navigate('Item', { id });
  };

  const itemSize =
    (screenWidth - CLOSET_ITEM_COLUMN_GAP * COLUMN_COUNT) / COLUMN_COUNT;

  return (
    <View style={[styles.closetItem, hide && { opacity: 0.25 }]}>
      <View style={styles.stapleSymbolWrapper}>
        <StapleSymbol staple={item.staple} readonly />
      </View>
      <TouchableOpacity
        disabled={hide}
        activeOpacity={selectMode ? 1 : 0.2}
        onPress={selectMode ? () => onSelectItem(item) : onSeeItem}
      >
        <Image
          style={[
            styles.image,
            {
              width: itemSize,
              height: itemSize,
            },
          ]}
          source={item.image}
        />
        {selected && selectMode ? (
          <View style={styles.check}>
            <Ionicons
              name="checkmark-circle"
              size={24}
              color={COLORS.white_100}
            />
          </View>
        ) : null}

        {/* <View style={styles.itemDetailsContainer}>
          <View>
            <Text style={styles.itemName}>{name}</Text>
            <View style={styles.moreDetails}>
              <Text style={styles.wornCount}>worn count: {wornCount}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <MaterialCommunityIcons
              name="dots-vertical"
              size={24}
              color={COLORS.black_70}
            />
          </TouchableOpacity>
        </View> */}
      </TouchableOpacity>
    </View>
  );
}

function CancelButton({ onPress }: CancelButtonProps) {
  return (
    <TouchableOpacity style={headerRightStyles.container} onPress={onPress}>
      <Text>Cancel</Text>
    </TouchableOpacity>
  );
}

export function MyCloset({ navigation, route }) {
  const selectModeOnMount = !!route.params?.selectMode;
  const isFocused = useIsFocused();
  const tags = useTags('item-type');
  const items = useItems();

  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);

  const [selectMode, setSelectMode] = useState(selectModeOnMount);
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);

  const [rerenderFlatlist, setRerenderFlatlist] = useState(false);

  const navHeaderTitle = useMemo(() => {
    if (!selectMode) return '';
    if (selectedItems.length == 0) return 'Select some items';
    if (selectedItems.length == 1) return '1 item selected';

    return `${selectedItems.length} items selected`;
  }, [selectMode, selectedItems]);

  const goToCreateOutfit = () => {
    navigation.navigate('CreateOutfit', { items: selectedItems });
  };

  const createOutfit = () => {
    setSelectMode(true);
  };

  const addItem = () => {
    navigation.navigate('ItemDetails');
  };

  const onSelectItem = (selectedItem: Item) => {
    if (selectedItems.some((item) => item.id === selectedItem.id)) {
      setSelectedItems(selectedItems.filter((si) => si.id !== selectedItem.id));
    } else {
      setSelectedItems([...selectedItems, selectedItem]);
    }
  };

  const onTagPress = (tag: Tag) => {
    if (selectedTag === null) {
      setSelectedTag(tag);
      return;
    }

    if (selectedTag.id === tag.id) {
      setSelectedTag(null);
      return;
    }

    setSelectedTag(tag);
  };

  useEffect(() => {
    if (isFocused) {
      setSelectMode(selectModeOnMount);
      return;
    }

    navigation.setParams({ selectMode: null });
    setSelectMode(false);
    setSelectedItems([]);
  }, [isFocused]);

  useEffect(() => {
    navigation.setOptions({
      headerTitle: navHeaderTitle,
      headerRight: () =>
        selectMode ? (
          <CancelButton
            onPress={() => {
              setSelectMode(false);
              setSelectedItems([]);
            }}
          />
        ) : (
          <></>
        ),
    });
  }, [navigation, selectMode, navHeaderTitle]);
  return (
    <ScreenLayout
      scroll={false}
      action={
        <Button
          onPress={
            items.length > 1
              ? selectMode
                ? goToCreateOutfit
                : createOutfit
              : addItem
          }
          title={
            items.length > 1
              ? selectMode
                ? "I'm ready"
                : 'Make an outfit'
              : 'Add item'
          }
          disabled={selectMode && selectedItems.length < 1}
        />
      }
    >
      <View style={styles.myClosetContainer}>
        <View style={styles.tagsContainer}>
          <Tags selected={selectedTag} onPress={onTagPress} tags={tags} />
        </View>
        <FlatList
          contentContainerStyle={styles.outfitsContainer}
          data={items}
          numColumns={COLUMN_COUNT}
          extraData={rerenderFlatlist}
          renderItem={({ item }) => (
            <ClosetItem
              onSelectItem={onSelectItem}
              item={item}
              id={item.id}
              selectMode={selectMode}
              selected={selectedItems.some((i) => i.id === item.id)}
              hide={
                selectedTag === null
                  ? false
                  : !item.type?.some((o) => o.id === selectedTag.id)
              }
            />
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  myClosetContainer: {
    flex: 1,
    marginTop: 8,
  },
  tagsContainer: {
    marginTop: 8,
    paddingHorizontal: 8,
    paddingBottom: 16,
  },
  outfitsContainer: {
    paddingHorizontal: CLOSET_ITEM_COLUMN_GAP / COLUMN_COUNT,
  },
  // Closet Item Styles
  closetItem: {
    width: `${100 / COLUMN_COUNT}%`,
    paddingHorizontal: CLOSET_ITEM_COLUMN_GAP / COLUMN_COUNT,
    marginBottom: CLOSET_ITEM_COLUMN_GAP,
  },
  stapleSymbolWrapper: {
    top: 4,
    right: 4,
    position: 'absolute',
    zIndex: 10,
  },
  image: {
    objectFit: 'cover',
    width: '100%',
  },
  check: {
    left: 8,
    top: 8,
    position: 'absolute',
  },
  itemDetailsContainer: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    paddingTop: 8,
    paddingLeft: 8,
    paddingBottom: 32,
  },
  itemName: {
    fontSize: 16,
  },
  moreDetails: {
    marginTop: 4,
  },
  wornCount: {
    fontSize: 10,
    color: COLORS.black_20,
  },
});

const headerRightStyles = StyleSheet.create({
  container: { paddingRight: 8 },
});
