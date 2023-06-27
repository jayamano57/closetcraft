import { View, Text, StyleSheet } from 'react-native';
import { ScreenLayout } from '../layout';
import { Button } from '../../components/Button/Button';
import Lottie from 'lottie-react-native';
import { useItems } from '../../services/item/item.hook';
import { ContentView } from './components/ContentView';
import { useOutfits } from '../../services/outfit/outfit.hook';
import { useTags } from '../../services/tag/tag.hook';

function EmptyView() {
  return (
    <View style={emptyViewStyles.emptyView}>
      <View style={emptyViewStyles.emptyAnimationWrapper}>
        <Lottie source={require('../../../assets/empty.json')} autoPlay loop />
      </View>
      <Text style={emptyViewStyles.emptyText}>hmm... your closet's empty</Text>
    </View>
  );
}

export function Home({ navigation }): JSX.Element {
  const items = useItems();
  const outfits = useOutfits();
  const tags = useTags('outfit-occasion');

  const onAddToCloset = async () => {
    navigation.navigate('ItemDetails');
  };

  return (
    <ScreenLayout
      scroll={false}
      action={<Button onPress={onAddToCloset} title="Add to My Closet" />}
    >
      {items.length > 0 ? (
        <ContentView items={items} outfits={outfits} tags={tags} />
      ) : (
        <EmptyView />
      )}
    </ScreenLayout>
  );
}

const emptyViewStyles = StyleSheet.create({
  emptyView: {
    flex: 1,
    marginTop: 80,
  },
  emptyAnimationWrapper: {
    height: 300,
    marginBottom: 32,
  },
  emptyText: {
    textAlign: 'center',
    fontSize: 20,
  },
});
