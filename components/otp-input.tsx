import React, { useRef, useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface OTPInputProps {
  length?: number;
  onCodeFilled?: (code: string) => void;
  onCodeChange?: (code: string) => void;
}

export function OTPInput({ length = 4, onCodeFilled, onCodeChange }: OTPInputProps) {
  const [code, setCode] = useState<string[]>(Array(length).fill(''));
  const inputs = useRef<Array<TextInput | null>>([]);

  const focusNext = (index: number, value: string) => {
    if (index < length - 1 && value) {
      inputs.current[index + 1]?.focus();
    }
  };

  const focusPrevious = (index: number, key: string) => {
    if (key === 'Backspace' && index > 0) {
      inputs.current[index - 1]?.focus();
    }
  };

  const handleChange = (text: string, index: number) => {
    let value = text;

    if (value.length > 1) {
      value = value.charAt(0);
    }

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    onCodeChange?.(newCode.join(''));

    if (value) {
      focusNext(index, value);
    }

    if (newCode.every((digit) => digit !== '') && newCode.join('').length === length) {
      onCodeFilled?.(newCode.join(''));
    }
  };

  const handleKeyPress = (key: string, index: number) => {
    if (key === 'Backspace') {
      focusPrevious(index, key);
    }
  };

  return (
    <View style={styles.container}>
      {Array.from({ length }).map((_, index) => (
        <TextInput
          key={index}
          ref={(ref) => {
            inputs.current[index] = ref;
          }}
          style={styles.box}
          value={code[index]}
          onChangeText={(text) => handleChange(text, index)}
          onKeyPress={(event) => handleKeyPress(event.nativeEvent.key, index)}
          keyboardType="number-pad"
          maxLength={1}
          textAlign="center"
          selectTextOnFocus
          selectionColor="#046A38"
          cursorColor="#046A38"
        />
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
    width: '100%',
    gap: 12,
  },
  box: {
    height: 65,
    width: 65,
    borderColor: '#046A38',
    borderRadius: 25,
    borderWidth: 2,
    fontSize: 30,
    fontWeight: 'bold',
    color: '#024D27',
    backgroundColor: '#fff',
  },
});
