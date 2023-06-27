import { StyleSheet, Text, View } from 'react-native';
import { COLORS } from '../../../styles/colors';

interface FormGroupProps {
  label: string;
  instructionalText?: string;
  input: JSX.Element;
  optional?: boolean;
}

export function FormGroup({
  label,
  instructionalText,
  input,
  optional,
}: FormGroupProps) {
  return (
    <View style={styles.formGroup}>
      <View style={styles.labelContainer}>
        <View style={styles.labelWrapper}>
          <Text style={styles.label}>{label}</Text>
          {optional ? <Text style={styles.optional}>(optional)</Text> : null}
        </View>
        {instructionalText ? (
          <Text style={styles.instructionalText}>{instructionalText}</Text>
        ) : null}
      </View>
      <View style={styles.inputContainer}>{input}</View>
    </View>
  );
}

const styles = StyleSheet.create({
  formGroup: {
    marginBottom: 24,
  },
  labelContainer: {
    marginBottom: 12,
  },
  labelWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
  },
  optional: {
    fontSize: 12,
    marginLeft: 2,
    fontStyle: 'italic',
  },
  instructionalText: {
    color: COLORS.black_40,
    fontSize: 12,
  },
  inputContainer: {},
});
