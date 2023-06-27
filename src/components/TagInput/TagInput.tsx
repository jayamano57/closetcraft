import { StyleSheet, Text, TouchableWithoutFeedback, View } from 'react-native';
import { TextInput } from '../TextInput/TextInput';
import { COLORS } from '../../styles/colors';
import { Ionicons } from '@expo/vector-icons';
import { v4 as uuid } from 'uuid';
import {
  Tag as TagType,
  TagType as TagTypeType,
} from '../../services/tag/tag.types';
import { tagService } from '../../services/tag/tag.service';

interface TagInputProps {
  tags: TagType[];
  tagType: TagTypeType;
  onChangeText(text: string): void;
  textValue: string;
  onSubmit(tags: TagType[]): void;
  onRemoveTag(id: string): void;
}

function Tag({ name, id, onRemoveTag }) {
  return (
    <View style={styles.tag}>
      <Text style={styles.tagText}>{name}</Text>
      <TouchableWithoutFeedback onPress={() => onRemoveTag(id)}>
        <View style={styles.removeTag}>
          <Ionicons name="close" size={16} color={COLORS.white_100} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
}

export function TagInput({
  tags,
  tagType,
  onChangeText,
  textValue,
  onSubmit,
  onRemoveTag,
}: TagInputProps) {
  const handleOnSubmit = async () => {
    onChangeText('');

    const tagsCopy = [...tags];
    const tagExists = tagsCopy.some(
      (t) => t.name.toLowerCase() === textValue.trim().toLowerCase()
    );

    if (tagExists) return;

    const storedTag = await tagService.getTagByName(textValue.trim(), tagType);

    const tag: TagType = storedTag || {
      id: uuid(),
      name: textValue.trim(),
      type: tagType,
    };

    onSubmit([...tags, tag]);
  };

  return (
    <View style={styles.tagInput}>
      {tags
        ? tags.map((t) => (
            <Tag key={t.id} id={t.id} name={t.name} onRemoveTag={onRemoveTag} />
          ))
        : null}
      <TextInput
        autoComplete="off"
        autoCapitalize="none"
        size="small"
        inputStyles={styles.input}
        onChangeText={onChangeText}
        value={textValue}
        onSubmitEditing={handleOnSubmit}
        placeholder="Add item..."
      />
    </View>
  );
}

const styles = StyleSheet.create({
  tag: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: COLORS.black_0,
    paddingLeft: 8,
    paddingRight: 4,
    paddingVertical: 4,
    borderRadius: 4,
  },
  tagText: {
    color: COLORS.white_100,
  },
  removeTag: {
    marginLeft: 8,
  },
  tagInput: {
    paddingHorizontal: 4,
    paddingVertical: 8,
    flexWrap: 'wrap',
    paddingLeft: 8,
    flexDirection: 'row',
    alignItems: 'center',
    borderRadius: 4,
    borderWidth: 0.5,
    borderColor: COLORS.black_70,
    gap: 8,
  },
  input: {
    flex: 1,
    borderWidth: 0,
    padding: 0,
    minWidth: '50%',
  },
});
