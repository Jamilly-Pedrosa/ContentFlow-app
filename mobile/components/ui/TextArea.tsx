import { useState } from 'react';
import { Text, TextInput, TextInputProps, View } from 'react-native';

interface TextAreaProps extends TextInputProps {
label?: string;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;
  maxLength?: number;
  showCharacterCount?: boolean;
}

export function TextArea({
  label,
  helperText,
  errorMessage,
  error = false,
  maxLength,
  showCharacterCount = false,
  value,
  defaultValue,
  onChangeText,
  onFocus,
  onBlur,
  multiline = true,
  ...props
}: TextAreaProps) {
  const [focused, setFocused] = useState(false);
  const [internalValue, setInternalValue] = useState(defaultValue ?? '');

  const currentValue = value ?? internalValue;
  const characterCount = String(currentValue).length;

  const borderColor = error
    ? 'border-red-500'
    : focused
      ? 'border-primary-500'
      : 'border-gray-500';

  function handleChangeText(text: string) {
    if (value === undefined) {
      setInternalValue(text);
    }

    onChangeText?.(text);
  }

  return (
    <View className="w-full">
      {label && (
        <Text className="mb-4 font-poppins-medium text-small-text text-text">
          {label}
        </Text>
      )}

      <View className={`w-full rounded-[14px] border ${borderColor}`}>
        <TextInput
          className="min-h-[120px] px-4 py-3 font-poppins-regular text-legal-text text-black"
          placeholderTextColor="#939393"
          multiline={multiline}
          textAlignVertical="top"
          value={value === undefined ? internalValue : value}
          defaultValue={undefined}
          onChangeText={handleChangeText}
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          maxLength={maxLength}
          {...props}
        />
      </View>

      <View className="mt-2 flex-row items-start justify-between">
        <View className="flex-1">
          {error && errorMessage ? (
            <Text className="font-poppins-medium text-legal-text text-red-500">
              {errorMessage}
            </Text>
          ) : helperText ? (
            <Text className="font-poppins-medium text-legal-text text-gray-900">
              {helperText}
            </Text>
          ) : null}
        </View>

        {showCharacterCount && maxLength !== undefined && (
          <Text className="ml-2 font-poppins-regular text-legal-text text-gray-500">
            {characterCount}/{maxLength}
          </Text>
        )}
      </View>
    </View>
  );
}
