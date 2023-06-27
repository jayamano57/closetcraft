import { Image, StyleSheet, Text, useWindowDimensions } from 'react-native';
import { COLORS } from '../../styles/colors';
import { ViewableImageList } from '../OutfitDetails/components/ItemImageList';
import { useOutfit } from '../../services/outfit/outfit.hook';
import { Feather } from '@expo/vector-icons';

import { OutfitThumbnail } from '../../components/OutfitThumbnail/OutfitThumbnail';
import { DetailsContainer } from '../../components/DetailsContainer/DetailsContainer';
import { ActionIconButton } from '../Item/components/ActionIconButton';
import { outfitService } from '../../services/outfit/outfit.service';
import { setOutfit } from '../../state/outfit.state';
import { StapleSymbol } from '../../components/StapleSymbol/StapleSymbol';
import { ErrorOverlay } from '../../components/ErrorOverlay/ErrorOverlay';

export function Outfit({ navigation, route }) {
  const { id } = route.params;
  const outfit = useOutfit(id);

  const { height: screenHeight, width: screenWidth } = useWindowDimensions();

  const onEditOutfit = () => {
    navigation.navigate('OutfitDetails', { outfit, items: outfit.items });
  };

  const onDeleteOutfit = async () => {
    await outfitService.deleteOutfit(id);
    navigation.goBack();
  };

  const onStaple = async () => {
    setOutfit({ ...outfit, staple: !outfit.staple });
    await outfitService.staple(id);
  };

  if (!outfit)
    return <ErrorOverlay message="This outfit doesn't exist anymore" />;

  return (
    <DetailsContainer
      backgroundImage={
        outfit.image ? (
          <Image style={styles.image} source={{ uri: outfit.image.uri }} />
        ) : (
          <OutfitThumbnail
            items={outfit.items}
            height={screenHeight}
            width={screenWidth}
          />
        )
      }
      header={outfit.name}
      headerRight={<StapleSymbol staple={outfit.staple} onPress={onStaple} />}
      actions={[
        <ActionIconButton
          onPress={onEditOutfit}
          icon={<Feather name="edit-2" size={18} color="black" />}
          color={COLORS.black_90}
          size={32}
        />,
        <ActionIconButton
          onPress={onDeleteOutfit}
          icon={<Feather name="trash-2" size={16} color="black" />}
          color={COLORS.red_70}
          size={32}
        />,
      ]}
      tags={outfit.occasion}
      details={[
        {
          title: 'Items:',
          content: (
            <ViewableImageList
              viewable
              type="item"
              items={outfit.items.map((item) => ({
                name: item.name,
                image: item.image,
                id: item.id,
              }))}
            />
          ),
        },
        {
          title: 'Description:',
          content: <Text>{outfit.description}</Text>,
          hide: !outfit.description,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    objectFit: 'contain',
    height: '100%',
    width: '100%',
  },
});
