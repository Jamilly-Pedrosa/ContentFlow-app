import { View, Text, Pressable } from 'react-native';
import {
  DotsThreeVerticalIcon,
  CaretRightIcon,
} from 'phosphor-react-native';
import type { ReactNode } from 'react';

interface PostCardProps {
  title: string;
  date: string;
  status: ReactNode;
  action?: 'options' | 'navigate';
  onActionPress?: () => void;
}

export function PostCard({
  title,
  date,
  status,
  action = 'options',
  onActionPress,
}: PostCardProps) {
  function formatDate(dateString: string) {
    const parsedDate = new Date(dateString);

    if (Number.isNaN(parsedDate.getTime())) {
      return { day: '--', month: '--' };
    }

    return {
      day: String(parsedDate.getUTCDate()).padStart(2, '0'),
      month: parsedDate
        .toLocaleDateString('pt-BR', {
          month: 'short',
          timeZone: 'UTC',
        })
        .replace('.', '')
        .toUpperCase(),
    };
  }

  const { day, month } = formatDate(date);

  return (
    <View className="flex-row items-center rounded-2xl bg-gray-50 p-2">
      {/* Data */}
      <View className="w-[70px] h-[80px] items-center justify-center rounded-xl bg-gray-100">
        <Text className="text-heading-1 font-poppins-medium text-black">
          {day}
        </Text>

        <Text className="text-small-text font-poppins-regular text-black">
          {month}
        </Text>
      </View>

      {/* Informações */}
      <View className="ml-3 flex-1">
        <Text
          className="text-body-text font-poppins text-text"
          numberOfLines={1}
        >
          {title}
        </Text>

        <View className="mt-2 self-start">
          {status}
        </View>
      </View>

      {/* Ação */}
      <Pressable
        onPress={onActionPress}
        disabled={!onActionPress}
        accessibilityRole="button"
        accessibilityLabel={
          action === 'options'
            ? 'Opções do post'
            : 'Visualizar post'
        }
        className="w-[38px] h-[38px] items-center justify-center rounded-full bg-gray-100"
      >
        {action === 'options' ? (
          <DotsThreeVerticalIcon size={24} color="#777777" />
        ) : (
          <CaretRightIcon size={24} color="#777777" />
        )}
      </Pressable>
    </View>
  );
}
