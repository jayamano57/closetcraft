import { ScreenLayout } from '../layout';
import { Button } from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { TagInput } from '../../components/TagInput/TagInput';
import { TextInput } from '../../components/TextInput/TextInput';
import { HeaderInput } from './components/HeaderInput';
import { FormGroup } from './components/FormGroup';
import { PhotoBox } from './components/PhotoBox';
import { Camera } from '../Camera/Camera';
import { PositionChooser } from './components/PositionChooser';
import { Camera as ExpoCamera } from 'expo-camera';
import { v4 as uuid } from 'uuid';
import { Item, ItemPosition } from '../../services/item/item.types';
import { itemService } from '../../services/item/item.service';
import { tagService } from '../../services/tag/tag.service';
import { Tag } from '../../services/tag/tag.types';
import { KeyboardAvoidingView, Platform, StyleSheet } from 'react-native';

export function ItemDetails({ route, navigation }) {
  const editMode = !!route.params?.item;

  const editItem: Item = route.params?.item ?? {};

  const [itemName, setItemName] = useState(editItem?.name ?? '');

  const [startCamera, setStartCamera] = useState(false);
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
  const [photo, setPhoto] = useState(editItem?.image ?? null);

  const [selectedPositionIndex, setSelectedPositionIndex] =
    useState<ItemPosition>(editItem?.position ?? ItemPosition.HEAD);

  const [typeTag, setTypeTag] = useState('');
  const [typeTags, setTypeTags] = useState<Tag[]>(editItem?.type ?? []);
  const [description, setDescription] = useState(editItem?.description ?? '');

  const [buttonDisabled, setButtonDisabled] = useState(false);

  const onStartCamera = async () => {
    try {
      if (!permission.granted) {
        await requestPermission();
      }
      setStartCamera(true);
    } catch (err) {}
  };

  const onTakePhoto = async (photo) => {
    setStartCamera(false);
    setPhoto(photo);
  };

  const onRemoveTag = (id) => {
    setTypeTags([...typeTags].filter((t) => t.id !== id));
  };

  const addNewItem = async () => {
    setButtonDisabled(true);
    // remove bg from image

    // save to db
    const item: Item = {
      id: editItem?.id ?? uuid(),
      name: itemName,
      image: photo,
      position: selectedPositionIndex,
      wornCount: editItem?.wornCount ?? 0,
      outfits: editItem?.outfits ?? [],
      staple: editItem?.staple ?? false,
      description,
      type: typeTags,
    };
    await tagService.addTags(typeTags);
    await itemService.setItem(item);

    setButtonDisabled(false);

    navigation.navigate('Home');
  };

  useEffect(() => {
    if (!itemName.trim() || !photo) {
      setButtonDisabled(true);
      return;
    }

    setButtonDisabled(false);
  }, [itemName, photo]);

  return startCamera ? (
    <Camera
      onTakePhoto={onTakePhoto}
      onBack={() => setStartCamera(false)}
      cameraText="Make sure the item has a clear background with good contrast and
    lighting."
    />
  ) : (
    <ScreenLayout
      action={
        <Button
          onPress={addNewItem}
          title={editMode ? 'Save Item' : 'Add Item'}
          disabled={buttonDisabled}
        />
      }
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.itemDetailsContainer}
      >
        <HeaderInput
          value={itemName}
          onChangeText={setItemName}
          placeholder="Item name..."
        />
        <FormGroup
          label="Item Photo"
          instructionalText="Take a photo of the item you want to add to your closet!"
          input={<PhotoBox photo={photo} onAddPhoto={onStartCamera} />}
        />
        <FormGroup
          label="Position"
          instructionalText="Where on the body does this item belong?"
          input={
            <PositionChooser
              selectedIndex={selectedPositionIndex}
              onPress={setSelectedPositionIndex}
            />
          }
        />
        <FormGroup
          label="Type"
          instructionalText="Jacket, t-shirt, hoodie, gym shorts, etc."
          optional
          input={
            <TagInput
              tagType="item-type"
              textValue={typeTag}
              onChangeText={setTypeTag}
              onSubmit={setTypeTags}
              onRemoveTag={onRemoveTag}
              tags={typeTags}
            />
          }
        />
        <FormGroup
          label="Description"
          optional
          input={
            <TextInput
              onChangeText={setDescription}
              value={description}
              size="small"
              multiline
              numberOfLines={4}
              inputStyles={{ height: 100 }}
            />
          }
        />
      </KeyboardAvoidingView>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  itemDetailsContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
});
