import { useEffect, useState } from 'react';
import { Tag, TagType } from './tag.types';
import { tagService } from './tag.service';
import { useNavigation } from '@react-navigation/native';

export function useTags(type: TagType): Tag[] {
  const navigation = useNavigation();
  const [tags, setTags] = useState([]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      tagService.getTags().then((tags) => {
        tags && setTags(tags.filter((tag) => tag.type === type));
      });
    });

    return unsubscribe;
  }, []);

  return tags ? tags : [];
}
