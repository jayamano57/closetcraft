import { ScreenLayout } from '../layout';
import { Button } from '../../components/Button/Button';
import { useEffect, useState } from 'react';
import { TagInput } from '../../components/TagInput/TagInput';
import { TextInput } from '../../components/TextInput/TextInput';
import { Camera } from '../Camera/Camera';
import { Camera as ExpoCamera } from 'expo-camera';
import { v4 as uuid } from 'uuid';
import { Item } from '../../services/item/item.types';
import { itemService } from '../../services/item/item.service';
import { tagService } from '../../services/tag/tag.service';
import { Tag } from '../../services/tag/tag.types';
import { KeyboardAvoidingView, Platform, StyleSheet, View } from 'react-native';
import { HeaderInput } from '../ItemDetails/components/HeaderInput';
import { FormGroup } from '../ItemDetails/components/FormGroup';
import { PhotoBox } from '../ItemDetails/components/PhotoBox';
import { ViewableImageList } from './components/ItemImageList';
import { Outfit } from '../../services/outfit/outfit.types';
import { outfitService } from '../../services/outfit/outfit.service';

export function OutfitDetails({ navigation, route }) {
  const editMode = !!route.params?.outfit;

  const items: Item[] = route.params?.items ?? [];
  const editOutfit: Outfit = route.params?.outfit ?? {};

  const [outfitName, setOutfitName] = useState(editOutfit.name ?? '');

  const [startCamera, setStartCamera] = useState(false);
  const [permission, requestPermission] = ExpoCamera.useCameraPermissions();
  const [photo, setPhoto] = useState(editOutfit.image ?? null);

  const [occasionTag, setOccasionTag] = useState('');
  const [occasionTags, setOccasionTags] = useState<Tag[]>(
    editOutfit.occasion ?? []
  );

  const [description, setDescription] = useState(editOutfit.description ?? '');

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
    setOccasionTags([...occasionTags].filter((t) => t.id !== id));
  };

  const addNewItem = async () => {
    const outfit: Outfit = {
      id: editOutfit.id ?? uuid(),
      name: outfitName,
      image: photo,
      items,
      wornCount: editOutfit.wornCount ?? 0,
      staple: editOutfit.staple ?? false,
      occasion: occasionTags,
      description,
    };

    await tagService.addTags(occasionTags);
    await outfitService.setOutfit(outfit);
    await itemService.addOutfitToItems(outfit, items);

    navigation.navigate('Home');
  };

  useEffect(() => {
    if (!outfitName.trim()) {
      setButtonDisabled(true);
      return;
    }

    setButtonDisabled(false);
  }, [outfitName]);

  return startCamera ? (
    <Camera
      onTakePhoto={onTakePhoto}
      onBack={() => setStartCamera(false)}
      cameraText="Pose! Be sure to capture your entire outfit within the box."
    />
  ) : (
    <ScreenLayout
      action={
        <Button
          onPress={addNewItem}
          title={editMode ? 'Save Outfit' : 'Add Outfit'}
          disabled={buttonDisabled}
        />
      }
    >
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={styles.addOutfitContainer}
      >
        <HeaderInput
          value={outfitName}
          onChangeText={setOutfitName}
          placeholder="Outfit name..."
        />
        <FormGroup
          label="Items"
          instructionalText="This outfit is made up of these items"
          input={
            <ViewableImageList
              type="item"
              items={items.map((item) => ({
                name: item.name,
                image: item.image,
                id: item.id,
              }))}
            />
          }
        />
        <FormGroup
          optional
          label="Fit Photo"
          instructionalText="Take a picture of you wearing this outfit for future reference!"
          input={<PhotoBox photo={photo} onAddPhoto={onStartCamera} />}
        />

        <FormGroup
          label="Occasion"
          optional
          instructionalText="Date night, casual, gym day, movie night, etc."
          input={
            <TagInput
              tagType="outfit-occasion"
              textValue={occasionTag}
              onChangeText={setOccasionTag}
              onSubmit={setOccasionTags}
              onRemoveTag={onRemoveTag}
              tags={occasionTags}
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
              multiline={true}
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
  addOutfitContainer: {
    flex: 1,
    paddingHorizontal: 32,
  },
});
