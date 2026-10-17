import { Pressable, Text } from 'react-native';

type PostStatus = 'Planejado' | 'Em andamento' | 'Postado';

interface CardStatusPostProps {
  status: PostStatus;
  selected?: boolean;
  onPress?: () => void;
  disabled?: boolean;
}

const statusStyles = {
  Planejado: {
    background: 'bg-orange-50',
    text: 'text-orange-700',
    border: 'border-orange-500',
  },
  'Em andamento': {
    background: 'bg-blue-50',
    text: 'text-blue-700',
    border: 'border-blue-500',
  },
  Postado: {
    background: 'bg-green-50',
    text: 'text-green-700',
    border: 'border-green-500',
  },
};

export default function CardStatusPost({
  status,
  selected = false,
  onPress,
  disabled = false,
}: CardStatusPostProps) {
  const colors = statusStyles[status];
  const isDisabled = disabled || !onPress;

  return (
    <Pressable
      onPress={onPress}
      disabled={isDisabled}
      accessibilityRole={onPress ? 'button' : undefined}
      accessibilityState={{
        selected,
        disabled: isDisabled,
      }}
      accessibilityLabel={`Status do post: ${status}`}
      className={`
        self-start flex-row items-center justify-center
        rounded-full border
        px-[18px] py-[14px]
        ${colors.background}
        ${selected ? colors.border : 'border-transparent'}
      `}
      style={{
        opacity: disabled ? 0.6 : 1,
      }}
    >
      <Text
        className={`text-legal-text font-poppins-regular ${colors.text}`}
      >
        {status}
      </Text>
    </Pressable>
  );
}
