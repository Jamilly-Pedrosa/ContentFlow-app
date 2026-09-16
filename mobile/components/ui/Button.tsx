import { Pressable, Text, PressableProps } from 'react-native';
import type { ReactNode } from 'react';

type ButtonType = 'primary' | 'secondary' | 'tertiary';
type ButtonSize = 'M' | 'L';

interface ButtonProps extends PressableProps {
  children: ReactNode;
  type?: ButtonType;
  size?: ButtonSize;
  selected?: boolean;
  className?: string;
}

export function Button({
  children,
  type = 'primary',
  size = 'L',
  selected = false,
  disabled = false,
  className = '',
  ...props
}: ButtonProps) {
  const baseStyles = 'items-center justify-center flex-row rounded-[16px]';

  const sizeStyles = {
    M: 'h-[42px] px-8 self-center',
    L: 'h-[48px] w-full px-4',
  };

  const typeStyles = {
    primary:
      'bg-primary-500 active:bg-primary-400',

    secondary:
      'bg-[#E7E6E1] active:opacity-80',

    tertiary:
      'border border-gray-500 active:opacity-70',
  };

  const textStyles = {
    primary: 'text-white',
    secondary: 'text-black',
    tertiary: 'text-gray-800',
  };

  const disabledStyles = {
    primary: 'bg-primary-200',
    secondary: 'bg-[#E7E6E1] opacity-60',
    tertiary: 'border border-gray-500 opacity-60',
  };

  const selectedStyles = {
    primary: 'bg-primary-500/60',
    secondary: 'bg-[#E7E6E1]',
    tertiary: 'border-gray-500',
  };

  const stateStyles = disabled
    ? disabledStyles[type]
    : selected
      ? selectedStyles[type]
      : typeStyles[type];

  return (
    <Pressable
      disabled={disabled}
      className={`${baseStyles} ${sizeStyles[size]} ${stateStyles} ${className}`}
      {...props}
    >
      <Text className={textStyles[type]}>
        {children}
      </Text>
    </Pressable>
  );
}