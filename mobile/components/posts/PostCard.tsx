import { View, Text, Pressable } from 'react-native';
import { CaretRightIcon } from 'phosphor-react-native';
import type { ReactNode } from 'react';

import ActionsDropdown from '../ActionsDropdown/ActionsDropdown';

interface PostCardProps {
  title: string;
  date: string;
  status: ReactNode;

  action?: 'options' | 'navigate';
  
  onPress?: () => void;
  onEdit?: () => void;
  onDelete?: () => void;
  onDetails?: () => void;
}

export function PostCard({
  title,
  date,
  status,
  action = 'options',
  onPress,
  onEdit,
  onDelete,
  onDetails,
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
    <View className="flex-row items-center rounded-2xl bg-gray-50 p-2 overflow-visible">

      {/* Área clicável do card */}
      <Pressable
        onPress={onPress}
        disabled={!onPress}
        accessibilityRole="button"
        accessibilityLabel={`Visualizar detalhes do post ${title}`}
        className="flex-1 flex-row items-center"
      >

      {/* Data */}
      <View className="h-[80px] w-[70px] items-center justify-center rounded-xl bg-gray-100">
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
      </Pressable>

      {/* Ação */}
      {action === 'options' ? (
        <ActionsDropdown
          onEdit={onEdit}
          onDelete={onDelete}
          onDetails={onDetails}
        />
      ) : (
        <Pressable
          onPress={onDetails}
          disabled={!onDetails}
          accessibilityRole="button"
          accessibilityLabel="Visualizar post"
          className="h-[38px] w-[38px] items-center justify-center rounded-full bg-gray-100"
        >
          <CaretRightIcon size={24} color="#777777" />
        </Pressable>
      )}

    </View>
  );
}
