import { storageService } from '../storage/storage.service';
import { StorageValue, StorageService } from '../storage/storage.types';
import { Tag, TagService, TagType } from './tag.types';

const TAGS_KEY = '@tags';

class TagServiceImpl implements TagService {
  constructor(private storageService: StorageService) {}

  private async getStorageTags(): Promise<StorageValue<Tag>> {
    return (await this.storageService.get(TAGS_KEY)) ?? {};
  }

  private async checkTagExists(tag: Tag): Promise<boolean> {
    return !!(await this.getTagByName(tag.name, tag.type));
  }

  private async doAddTag(
    tag: Tag,
    storedTags: StorageValue<Tag>
  ): Promise<void> {
    const tagExists = await this.checkTagExists(tag);
    if (tagExists) return;

    storedTags[tag.id] = tag;

    await this.storageService.set(TAGS_KEY, storedTags);
  }

  async addTag(tag: Tag): Promise<void> {
    const storedTags = await this.getStorageTags();

    this.doAddTag(tag, storedTags);
  }

  async addTags(tags: Tag[]): Promise<void> {
    const storedTags = await this.getStorageTags();
    tags.forEach(async (t) => {
      this.doAddTag(t, storedTags);
    });
  }

  removeTag(tagId: string): void {
    throw new Error('Method not implemented.');
  }

  async getTags(): Promise<Tag[] | null> {
    const storedTags = await this.getStorageTags();

    return Object.values(storedTags);
  }

  async getTag(tagId: string): Promise<Tag | null> {
    const storedTags = await this.getStorageTags();

    return storedTags[tagId] || null;
  }

  async getTagByName(tagName: string, type: TagType): Promise<Tag | null> {
    const tags = await this.getTags();

    const tag = tags.find(
      (t) =>
        t.name.trim().toLowerCase() === tagName.trim().toLowerCase() &&
        t.type === type
    );

    return tag;
  }

  async purge() {
    await this.storageService.delete(TAGS_KEY);
  }
}

export const tagService = new TagServiceImpl(storageService);
