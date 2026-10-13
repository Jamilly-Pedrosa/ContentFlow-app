import { Pressable, Text, View } from 'react-native';
import { ArrowLeftIcon } from 'phosphor-react-native';
import type { IconProps } from 'phosphor-react-native';
import type { ComponentType } from 'react';

interface HeaderProps {
  title: string;

  leftIcon?: ComponentType<IconProps> | null;
  leftIconLabel?: string;
  onBackPress?: () => void;

  rightIcon?: ComponentType<IconProps> | null;
  rightIconLabel?: string;
  onRightPress?: () => void;
}

export function Header({
  title,
  leftIcon: LeftIcon = ArrowLeftIcon,
  leftIconLabel = 'Voltar',
  onBackPress,
  rightIcon: RightIcon,
  rightIconLabel = 'Ação do cabeçalho',
  onRightPress,
}: HeaderProps) {
  return (
    <View className="relative mt-4 h-10 flex-row items-center justify-between">
      {/* Área do ícone esquerdo */}
      <View className="h-8 w-8 items-center justify-center">
        {LeftIcon && onBackPress && (
          <Pressable
            onPress={onBackPress}
            className="h-8 w-8 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel={leftIconLabel}
            hitSlop={8}
          >
            <LeftIcon size={24} color="#727272" />
          </Pressable>
        )}
      </View>

      {/* Título centralizado */}
      <Text
        className="absolute left-8 right-8 text-center font-poppins-medium text-heading-2 text-text"
        numberOfLines={1}
      >
        {title}
      </Text>

      {/* Área do ícone direito */}
      <View className="z-10 h-8 w-8 items-center justify-center">
        {RightIcon && onRightPress && (
          <Pressable
            onPress={onRightPress}
            className="h-8 w-8 items-center justify-center"
            accessibilityRole="button"
            accessibilityLabel={rightIconLabel}
            hitSlop={8}
          >
            <RightIcon size={24} color="#727272" />
          </Pressable>
        )}
      </View>
    </View>
  );
}