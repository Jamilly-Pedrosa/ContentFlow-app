import { Text, View, type ReactNode } from 'react-native';

interface MetricCardProps {
  title: string;
  value: number;
  icon: ReactNode;
  iconBackground: string;
}

export default function MetricCard({
  title,
  value,
  icon,
  iconBackground,
}: MetricCardProps) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F0F0F0',
        padding: 12,
        borderRadius: 8,
        gap: 12,
      }}
    >
      <View
        style={{
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: iconBackground,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        {icon}
      </View>

      <View style={{ flex: 1 }}>
        <Text style={{ fontSize: 28, fontWeight: 'bold', color: '#1A1A1A' }}>
          {value}
        </Text>

        <Text style={{ fontSize: 14, color: '#444444' }}>
          {title}
        </Text>
      </View>
    </View>
  );
}