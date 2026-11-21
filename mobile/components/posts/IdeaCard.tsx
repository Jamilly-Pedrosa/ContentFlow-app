
import { Pressable, Text, View } from 'react-native';
import { LightbulbIcon } from 'phosphor-react-native';

import PostActionsDropdown from '../ActionsDropdown/ActionsDropdown';

interface IdeaCardProps {
  title: string;
  isUsed?: boolean; // Indica se a ideia já foi utilizada para criar um post
  onPlan?: () => void; // Função chamada ao pressionar o botão "Planejar"
  onEdit?: () => void;
  onDelete?: () => void;
  onDetails?: () => void;
}

export default function IdeaCard({
  title,
  isUsed = false,
  onPlan,
  onEdit,
  onDelete,
  onDetails,
}: IdeaCardProps) {
  return (
    <View className="rounded-xl bg-white p-2 gap-2">

      {/* Conteúdo da ideia */}
      <View className="flex-row items-center gap-3">

        {/* Ícone */}
        <View className="h-[83px] w-[60px] items-center justify-center rounded-xl bg-gray-100">
          <LightbulbIcon size={24} color="#222222" />
        </View>

        {/* Título */}
        <View className="flex-1 justify-center">
          <Text
            className="text-body-text font-poppins text-text"
            numberOfLines={2}
          >
            {title}
          </Text>
        </View>

        {/* Menu de ações */}
        <PostActionsDropdown
          onEdit={onEdit}
          onDelete={onDelete}
          onDetails={onDetails}
        />

      </View>

      {/* Botão Planejar: exibido somente para ideias não utilizadas */}
      {!isUsed && (
        <Pressable
          onPress={onPlan}
          disabled={!onPlan}
          accessibilityRole="button"
          accessibilityLabel={`Planejar ideia: ${title}`}
          className="h-12 items-center justify-center rounded-full border border-[#A69AFF]"
        >
          <Text className="font-poppins-regular text-legal-text text-[#8068F5]">
            + Planejar
          </Text>
        </Pressable>
      )}

    </View>
  );
}
