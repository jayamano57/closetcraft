import {
  FlatList,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { COLORS } from '../../styles/colors';
import { Tag as TagType } from '../../services/tag/tag.types';

interface TagProps {
  tagName: string;
  onPress?: () => void;
  selected?: boolean;
}

interface TagsProps {
  selected: TagType;
  onPress: (tag: TagType) => void;
  tags: TagType[];
}

export function Tag({ tagName, onPress, selected }: TagProps) {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={{ paddingBottom: 0.5 }}>
        <Text
          style={[styles.tag, selected ? styles.selected : styles.unselected]}
        >
          {tagName}
        </Text>
      </View>
    </TouchableWithoutFeedback>
  );
}

export function Tags({ selected, onPress, tags }: TagsProps) {
  return (
    <FlatList
      horizontal
      showsHorizontalScrollIndicator={false}
      data={tags}
      renderItem={({ item }) => (
        <Tag
          key={item.id}
          tagName={item.name}
          onPress={() => onPress(item)}
          selected={item.id === selected?.id}
        />
      )}
      keyExtractor={(item) => item.id}
    />
  );
}

const styles = StyleSheet.create({
  tag: {
    borderRadius: 4,
    borderWidth: 0.5,
    paddingHorizontal: 8,
    paddingVertical: 4,
    overflow: 'hidden',
    marginRight: 8,
  },
  selected: {
    backgroundColor: COLORS.black_0,
    color: COLORS.white_100,
  },
  unselected: {
    borderColor: COLORS.black_70,
    backgroundColor: COLORS.white_100,
  },
});
