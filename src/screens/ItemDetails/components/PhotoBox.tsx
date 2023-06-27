import { Image, StyleSheet, TouchableOpacity, View } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { COLORS } from '../../../styles/colors';
import { IMAGE_ASPECT_RATIO } from '../../../../constants';
import { CameraCapturedPicture } from 'expo-camera';

interface PhotoBoxProps {
  photo: CameraCapturedPicture;
  onAddPhoto: () => void;
}

const ITEM_SIZE = 160;

export function PhotoBox({ photo, onAddPhoto }: PhotoBoxProps) {
  return (
    <TouchableOpacity onPress={onAddPhoto}>
      <View style={styles.photoBox}>
        {photo ? (
          <Image source={{ uri: photo.uri }} style={styles.image} />
        ) : (
          <View style={styles.emptyPhotoBox}>
            <Feather name="camera" size={30} color={COLORS.black_60} />
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  photoBox: {
    aspectRatio: IMAGE_ASPECT_RATIO,
    height: ITEM_SIZE,
    width: ITEM_SIZE,
    borderRadius: 4,
    overflow: 'hidden',
    backgroundColor: 'red',
  },
  emptyPhotoBox: {
    height: '100%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: COLORS.black_60,
    borderStyle: 'dashed',
    borderWidth: 2,
    backgroundColor: COLORS.black_90,
  },
  image: {
    height: '100%',
    width: '100%',
  },
});
