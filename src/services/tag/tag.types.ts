export type TagType = 'item-type' | 'outfit-occasion';

export interface Tag {
  id: string;
  type: TagType;
  name: string;
}

export interface TagService {
  addTag(tag: Tag): void;
  addTags(tag: Tag[]): void;
  removeTag(tagId: string): void;
  getTag(tagId: string): Promise<Tag | null>;
  getTags(): Promise<Tag[] | null>;
  getTagByName(tagName: string, tagType: TagType): Promise<Tag | null>;
  purge(): Promise<void>;
}
