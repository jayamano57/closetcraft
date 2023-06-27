import { WithLocalSvg } from 'react-native-svg';
import { ButtonGroup } from '../../../components/ButtonGroup/ButtonGroup';
import { StyleSheet, View } from 'react-native';
import { ImageSourcePropType } from 'react-native';

interface PositionButtonProps {
  asset: ImageSourcePropType;
}

interface PositionChooserProps {
  selectedIndex: number;
  onPress: (index: number) => void;
}

const assets = [
  require('../../../../assets/hat-black.svg'),
  require('../../../../assets/shirt-black.svg'),
  require('../../../../assets/pants-black.svg'),
  require('../../../../assets/shoe-black.svg'),
];

function PositionButton({ asset }: PositionButtonProps) {
  return (
    <View style={styles.positionButton}>
      <WithLocalSvg width="100%" height="100%" asset={asset} />
    </View>
  );
}

export function PositionChooser({
  selectedIndex,
  onPress,
}: PositionChooserProps) {
  return (
    <ButtonGroup
      selectedIndex={selectedIndex}
      onPress={onPress}
      buttons={assets.map((a) => (
        <PositionButton asset={a} />
      ))}
      buttonStyles={styles.buttonStyles}
    />
  );
}

const styles = StyleSheet.create({
  positionButton: {
    padding: 8,
    height: 60,
    width: 60,
    borderRadius: 4,
  },
  buttonStyles: {
    borderRadius: 4,
  },
});
