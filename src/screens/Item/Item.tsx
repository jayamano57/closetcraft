import { Image, StyleSheet, Text } from 'react-native';
import { useItem } from '../../services/item/item.hook';
import { COLORS } from '../../styles/colors';
import { DetailsContainer } from '../../components/DetailsContainer/DetailsContainer';
import { ViewableImageList } from '../OutfitDetails/components/ItemImageList';
import { Feather } from '@expo/vector-icons';
import { ActionIconButton } from './components/ActionIconButton';
import { itemService } from '../../services/item/item.service';
import { setItem } from '../../state/item.state';
import { StapleSymbol } from '../../components/StapleSymbol/StapleSymbol';
import { ErrorOverlay } from '../../components/ErrorOverlay/ErrorOverlay';

export function Item({ navigation, route }) {
  const { id } = route.params;
  const item = useItem(id);

  const onEditItem = () => {
    navigation.navigate('ItemDetails', { item });
  };

  const onDeleteItem = async () => {
    await itemService.deleteItem(id);
    navigation.goBack();
  };

  const onStaple = async () => {
    setItem({ ...item, staple: !item.staple });
    await itemService.staple(id);
  };

  if (!item) return <ErrorOverlay message="This item doesn't exist anymore" />;

  return (
    <DetailsContainer
      backgroundImage={
        <Image style={styles.image} source={{ uri: item.image.uri }} />
      }
      header={item.name}
      headerRight={<StapleSymbol staple={item.staple} onPress={onStaple} />}
      actions={[
        <ActionIconButton
          onPress={onEditItem}
          icon={<Feather name="edit-2" size={18} color="black" />}
          color={COLORS.black_90}
          size={32}
        />,
        <ActionIconButton
          onPress={onDeleteItem}
          icon={<Feather name="trash-2" size={16} color="black" />}
          color={COLORS.red_70}
          size={32}
        />,
      ]}
      tags={item.type}
      details={[
        {
          title: `Appears in: ${item.outfits.length} ${
            item.outfits.length > 1 ? 'outfits' : 'outfit'
          }`,
          hide: item.outfits.length < 1,
          content: (
            <ViewableImageList
              viewable
              type="outfit"
              items={item.outfits.map((item) => ({
                name: item.name,
                image: item.image,
                id: item.id,
              }))}
            />
          ),
        },
        {
          title: 'Description:',
          content: <Text>{item.description}</Text>,
          hide: !item.description,
        },
      ]}
    />
  );
}

const styles = StyleSheet.create({
  image: {
    objectFit: 'cover',
    height: '100%',
    width: '100%',
  },
});
