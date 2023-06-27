import { Text } from 'react-native';
import { StyleSheet, View } from 'react-native';

interface DetailsGroupProps {
  title: string;
  content: JSX.Element;
}

export function DetailsGroup({ title, content }: DetailsGroupProps) {
  return (
    <View style={styles.detailsContainer}>
      <View style={styles.detailContainer}>
        <Text style={styles.detailLabel}>{title}</Text>
        {content}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  detailsContainer: {},
  detailContainer: {
    marginBottom: 16,
  },
  detailLabel: { fontSize: 16, fontWeight: '700', marginBottom: 8 },
});
