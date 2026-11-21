import { useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import {
  DotsThreeVerticalIcon, //botão que abre o dropdown
  PencilSimpleIcon, //botão de editar
  TrashSimpleIcon, //botão de deletar
  FileTextIcon,
  NoteBlankIcon, //botão de detalhes
} from 'phosphor-react-native';

interface PostActionsDropdownProps {
  onEdit?: () => void;
  onDelete?: () => void;
  onDetails?: () => void;
}

export default function PostActionsDropdown({
  onEdit,
  onDelete,
  onDetails,
}: PostActionsDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  function handleAction(action?: () => void) {
    setIsOpen(false);
    action?.();
  }

  return (
    <View
      className="relative"
      style={{
        zIndex: isOpen ? 100 : 1,
        elevation: isOpen ? 10 : 0,
      }}
    >
      {/* Botão de abrir o dropdown */}
      <Pressable
        onPress={() => setIsOpen(!isOpen)}
        accessibilityRole="button"
        accessibilityLabel="Opções do post"
        accessibilityState={{ expanded: isOpen }}
        className="h-9 w-9 items-center justify-center rounded-full bg-[#E8E8E8]"
      >
        <DotsThreeVerticalIcon
          size={20}
          color="#777777"
        />
      </Pressable>

      {/* Menu de ações */}
      {isOpen && (
        <View
          className="absolute right-0 top-11 z-50 w-[152px] rounded-xl bg-white px-2 py-2"
          style={{
            elevation: 4,
            shadowColor: '#CFCFCF',
            shadowOffset: { width: 0, height: 2 },
            shadowOpacity: 0.15,
            shadowRadius: 4,
          }}
        >
          {/* Editar */}
          <Pressable
            onPress={() => handleAction(onEdit)}
            disabled={!onEdit}
            className="flex-row items-center gap-3 rounded-lg px-2 py-3"
          >
            <PencilSimpleIcon size={20} color="#222222" />

            <Text className="font-poppins-regular text-medium text-[#222222]">
              Editar
            </Text>
          </Pressable>

          <View className="mx-1 h-px bg-gray-100" />

          {/* Deletar */}
          <Pressable
            onPress={() => handleAction(onDelete)}
            disabled={!onDelete}
            className="flex-row items-center gap-3 rounded-lg px-2 py-3"
          >
            <TrashSimpleIcon size={20} color="#222222" />

            <Text className="font-poppins-regular text-medium text-[#222222]">
              Deletar
            </Text>
          </Pressable>

          {/* Detalhes */}
          <Pressable
            onPress={() => handleAction(onDetails)}
            disabled={!onDetails}
            className="flex-row items-center gap-3 rounded-lg px-2 py-3"
          >
            <NoteBlankIcon size={20} color="#222222" />

            <Text className="font-poppins-regular text-medium text-[#222222]">
              Detalhes
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}
