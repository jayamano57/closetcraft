import { StyleSheet, Text, View } from 'react-native';
import { useNavigation } from '@react-navigation/core';
import { HomeBanner } from './HomeBanner';
import { Tags } from '../../../components/Tags/Tags';
import { useState } from 'react';
import { OutfitsList } from './OutfitsList';
import { FeaturedList } from './FeaturedList';
import { Outfit } from '../../../services/outfit/outfit.types';
import { Item } from '../../../services/item/item.types';
import { Tag } from '../../../services/tag/tag.types';

interface ContentViewTopProps {
  outfits: Outfit[];
  tags: Tag[];
  selectedTag: Tag;
  onTagPress: (tag: Tag) => void;
  items: Item[];
}

interface ContentViewProps {
  items: Item[];
  outfits: Outfit[];
  tags: Tag[];
}

function ContentViewTop({
  outfits,
  tags,
  selectedTag,
  onTagPress,
  items,
}: ContentViewTopProps) {
  const navigation = useNavigation();
  // const tags = useTags('outfit-occasion');

  const showFeaturedList = items.length > 0;
  const showBanner = items.length > 1;
  const showOutfits = outfits.length > 0;

  const onPress = () => {
    navigation.navigate('My Closet', { selectMode: true });
  };

  return (
    <View style={contentViewTopStyles.container}>
      {showFeaturedList ? <FeaturedList items={items} /> : null}

      {showBanner ? (
        <View style={contentViewTopStyles.bannerContainer}>
          <HomeBanner onPress={onPress} buttonTitle="Let's start" />
        </View>
      ) : null}

      {showOutfits ? (
        <View style={contentViewTopStyles.outfitsListContainer}>
          <View>
            <Text style={contentViewTopStyles.title}>My Outfits</Text>
          </View>
          <View style={contentViewTopStyles.tagsContainer}>
            <Tags selected={selectedTag} onPress={onTagPress} tags={tags} />
          </View>
        </View>
      ) : null}
    </View>
  );
}

export function ContentView({
  items = [],
  outfits = [],
  tags = [],
}: ContentViewProps) {
  const [selectedTag, setSelectedTag] = useState<Tag | null>(null);
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

  return (
    <OutfitsList
      outfits={outfits}
      topComponent={
        <ContentViewTop
          outfits={outfits}
          tags={tags}
          items={items}
          selectedTag={selectedTag}
          onTagPress={onTagPress}
        />
      }
      outfitTag={selectedTag}
    />
  );
}

const contentViewTopStyles = StyleSheet.create({
  container: {},
  bannerContainer: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  outfitsListContainer: {
    marginTop: 24,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  tagsContainer: {
    paddingBottom: 16,
  },
});
