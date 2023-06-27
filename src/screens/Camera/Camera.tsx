import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import {
  CameraCapturedPicture,
  CameraType,
  Camera as ExpoCamera,
} from 'expo-camera';
import { useEffect, useRef, useState } from 'react';
import { Ionicons } from '@expo/vector-icons';

import { COLORS } from '../../styles/colors';
import { useNavigation } from '@react-navigation/native';
import { NavHeader } from '../../components/NavHeader/NavHeader';
import { IMAGE_ASPECT_RATIO } from '../../../constants';

interface CameraProps {
  onTakePhoto: (photo: CameraCapturedPicture) => void;
  onBack?: () => void;
  cameraText?: string;
  cropSize?: { height: number; width: number };
}

export function Camera({ onTakePhoto, onBack, cameraText }: CameraProps) {
  const navigation = useNavigation();
  const cameraRef = useRef<ExpoCamera>();

  const [type, setType] = useState(CameraType.back);
  const [disableButton, setDisableButton] = useState(false);

  const takePhoto = async () => {
    if (!cameraRef.current) return;
    setDisableButton(true);
    let photo = await cameraRef.current.takePictureAsync();

    setDisableButton(false);
    onTakePhoto(photo);
  };

  const toggleCameraType = () => {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  };

  useEffect(() => {
    navigation.setOptions({
      header: () => (
        <View>
          <NavHeader
            onLeftPress={onBack}
            right={
              <TouchableOpacity
                style={styles.button}
                onPress={toggleCameraType}
              >
                <View style={styles.reverse}>
                  <Ionicons
                    name="camera-reverse"
                    size={40}
                    color={COLORS.black_0}
                  />
                </View>
              </TouchableOpacity>
            }
          />
        </View>
      ),
    });

    return () => {
      navigation.setOptions({
        header: () => <NavHeader />,
      });
    };
  }, []);

  return (
    <View style={styles.cameraContainer}>
      <View style={styles.cameraAndText}>
        <View style={styles.cameraWrapper}>
          <ExpoCamera
            style={styles.camera}
            type={type}
            ref={cameraRef}
          ></ExpoCamera>
        </View>

        {cameraText ? (
          <Text style={styles.cameraText}>{cameraText}</Text>
        ) : null}
      </View>

      <View style={styles.bottomButtonsContainer}>
        <TouchableOpacity
          style={styles.takePhotoButton}
          onPress={takePhoto}
          disabled={disableButton}
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  cameraContainer: {
    flex: 1,
    width: '100%',
    alignItems: 'center',
    paddingTop: 48,
    paddingBottom: 48,
    justifyContent: 'space-between',
    backgroundColor: COLORS.white_100,
  },
  cameraAndText: {
    alignItems: 'center',
  },
  cropBoxContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cropBox: {
    bottom: 0,
    left: 0,
    width: 200,
    height: 200,
    backgroundColor: 'red',
  },
  cameraWrapper: {
    paddingHorizontal: 16,
  },
  camera: {
    zIndex: 100,
    overflow: 'hidden',
    borderRadius: 8,
    aspectRatio: IMAGE_ASPECT_RATIO,
    width: '100%',
  },
  cameraText: {
    paddingHorizontal: 32,
    marginTop: 40,
    fontSize: 14,
    textAlign: 'center',
  },
  topButtonsContainer: {
    paddingTop: 24,
    paddingRight: 24,
    alignItems: 'flex-end',
  },
  button: {
    width: 40,
    height: 40,
  },
  reverse: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  bottomButtonsContainer: {
    width: '100%',
    bottom: 0,
    left: 0,
    alignItems: 'center',
  },
  takePhotoButton: {
    borderRadius: 40,
    height: 80,
    width: 80,
    backgroundColor: COLORS.white_100,
    borderColor: COLORS.black_0,
    borderWidth: 2,
  },
  text: {},
});
