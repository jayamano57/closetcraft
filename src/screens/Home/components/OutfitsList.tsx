import {
  Image,
  Text,
  TouchableOpacity,
  View,
  useWindowDimensions,
} from 'react-native';
import { FlatList, StyleSheet } from 'react-native';
import { COLORS } from '../../../styles/colors';
import { BlurView } from 'expo-blur';
import { useNavigation } from '@react-navigation/native';
import { OutfitThumbnail } from '../../../components/OutfitThumbnail/OutfitThumbnail';
import { StapleSymbol } from '../../../components/StapleSymbol/StapleSymbol';
import { Outfit as OutfitType } from '../../../services/outfit/outfit.types';
import { Tag } from '../../../services/tag/tag.types';

interface OutfitProps {
  outfit: OutfitType;
  id: string;
  hide?: boolean;
}

interface OutfitsListProps {
  outfits: OutfitType[];
  topComponent: JSX.Element;
  outfitTag: Tag;
}

const COLUMN_COUNT = 2;

function Outfit({ outfit, id, hide }: OutfitProps) {
  const { width: screenWidth } = useWindowDimensions();
  const navigation = useNavigation();

  const onSeeOutfit = () => {
    navigation.navigate('Outfit', { id });
  };

  const itemSize = screenWidth / COLUMN_COUNT;

  return (
    <View style={[outfitStyles.outfit, hide && { opacity: 0.25 }]}>
      <TouchableOpacity
        onPress={onSeeOutfit}
        activeOpacity={0.9}
        disabled={hide}
      >
        <View style={outfitStyles.stapleSymbolWrapper}>
          <StapleSymbol staple={outfit.staple} readonly size={32} />
        </View>
        <View
          style={[
            outfitStyles.contentContainer,
            {
              width: itemSize,
              height: itemSize * 1.3,
            },
          ]}
        >
          {outfit.image ? (
            <Image style={outfitStyles.image} source={outfit.image} />
          ) : (
            <OutfitThumbnail
              items={outfit.items}
              height={itemSize * 1.3}
              width={itemSize}
            />
          )}
        </View>
        <BlurView
          intensity={40}
          tint="light"
          style={outfitStyles.detailsContainer}
        >
          <Text style={outfitStyles.name}>{outfit.name}</Text>
        </BlurView>
      </TouchableOpacity>
    </View>
  );
}

export function OutfitsList({
  outfits,
  topComponent,
  outfitTag,
}: OutfitsListProps) {
  return (
    <FlatList
      showsVerticalScrollIndicator={false}
      ListHeaderComponent={topComponent}
      contentContainerStyle={styles.outfitsContainer}
      data={outfits}
      numColumns={COLUMN_COUNT}
      renderItem={({ item }) => (
        <Outfit
          outfit={item}
          id={item.id}
          hide={
            outfitTag === null
              ? false
              : !item.occasion?.some((o) => o.id === outfitTag.id)
          }
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  container: {},
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  tagsContainer: {
    paddingBottom: 16,
  },
  outfitsContainer: {
    // height:'100%'
    // flex: 1,
    // paddingHorizontal: CLOSET_ITEM_COLUMN_GAP / COLUMN_COUNT,
    // marginTop: 16,
  },
});

const outfitStyles = StyleSheet.create({
  outfit: {
    width: `${100 / COLUMN_COUNT}%`,
  },
  stapleSymbolWrapper: {
    top: 8,
    right: 8,
    position: 'absolute',
    zIndex: 10,
  },
  contentContainer: {
    backgroundColor: COLORS.black_90,
  },
  image: {
    objectFit: 'cover',
    width: '100%',
    height: '100%',
    // height: 130,
  },
  noImage: { flexDirection: 'row', flexWrap: 'wrap' },
  detailsContainer: {
    width: '100%',
    paddingVertical: 20,
    position: 'absolute',
    bottom: 0,
  },
  name: {
    textAlign: 'center',
    fontSize: 16,
  },
});
