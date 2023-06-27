import { StyleSheet, Text, View } from 'react-native';
import { Button } from '../../components/Button/Button';
import { screenStyles } from '../styles';
import { TextInput } from '../../components/TextInput/TextInput';
import { useState } from 'react';
import { userService } from '../../services/user/user.service';
import { v4 as uuid } from 'uuid';
import { setUser } from '../../state/user.state';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export function Name() {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState('');

  const handleNext = async () => {
    const user = { id: uuid(), name };
    try {
      await userService.createUser(user);
      setUser(user);
    } catch (err) {
      alert(err);
    }
  };

  return (
    <View
      style={[
        screenStyles.container,
        styles.container,
        screenStyles.content,
        { paddingBottom: insets.bottom },
      ]}
    >
      <View style={styles.body}>
        <Text style={styles.label}>My name is...</Text>
        <TextInput onChangeText={setName} value={name} />
      </View>
      <Button title="Next" onPress={handleNext} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { width: '100%' },
  body: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    flex: 1,
  },
  label: {
    width: '100%',
    textAlign: 'left',
    marginBottom: 8,
  },
});
