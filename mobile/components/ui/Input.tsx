import { useState } from 'react';
import { Pressable, Text, TextInput, TextInputProps, View } from 'react-native';
import type { ComponentType } from 'react';
import type { IconProps } from 'phosphor-react-native';

interface InputProps extends TextInputProps {
  label?: string;
  helperText?: string;
  errorMessage?: string;
  error?: boolean;

  rightIcon?: ComponentType<IconProps>;
  onRightIconPress?: () => void;
}

export function Input({
  label,
  helperText,
  errorMessage,
  error = false,
  rightIcon: RightIcon,
  onRightIconPress,
  onFocus,
  onBlur,
  ...props
}: InputProps) {
  const [focused, setFocused] = useState(false);

  const borderColor = error
    ? 'border-red-500'
    : focused
      ? 'border-primary-500'
      : 'border-gray-500';

  return (
    <View className="w-full">
      {label && (
        <Text className="mb-4 font-poppins-medium text-small-text text-text">
          {label}
        </Text>
      )}
      
      <View
        className={`h-[46px] w-full flex-row items-center rounded-[14px] border ${borderColor}`}
      >
        <TextInput
          className="flex-1 pl-4 pr-2 text-legal-text text-black"
          placeholderTextColor="#939393" 
          //placeholderTextColor={colors.gray[700]} 
          onFocus={(event) => {
            setFocused(true);
            onFocus?.(event);
          }}
          onBlur={(event) => {
            setFocused(false);
            onBlur?.(event);
          }}
          {...props}
        />

        {RightIcon && (
          <Pressable
            onPress={onRightIconPress}
            disabled={!onRightIconPress}
            hitSlop={8}
            className="mr-4"
          >
            <RightIcon
              size={20}
              color="#1A1A1A"
              weight="regular"
            />
          </Pressable>
        )}
      </View>

      {error && errorMessage ? (
        <Text className="mt-2 font-poppins-medium text-legal-text text-red-500">
          {errorMessage}
        </Text>
      ) : helperText ? (
        <Text className="mt-2 font-poppins-medium text-legal-text text-gray-900">
          {helperText}
        </Text>
      ) : null}
    </View>
  );
}