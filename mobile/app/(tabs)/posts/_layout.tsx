import { Pressable, Text, View } from 'react-native';
import { Slot, router, usePathname } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { Tabs } from '../../../components/ui/Tabs';

export default function PostLayout() {
  const pathname = usePathname();

  const activeTab =
    pathname === '/posts/ideias'
      ? 'Ideias'
      : 'Planejamento';

  function handleTabChange(tab: string) {
    if (tab === 'Planejamento') {
      router.push('/posts');
      return;
    }

    if (tab === 'Ideias') {
      router.push('/posts/ideias');
    }
  }

  return (
    <View className="flex-1 bg-white px-4">

      {/* Header */}
      <View className="flex-row items-center justify-between mt-4">

        <Pressable
          onPress={() => router.back()}
          className="w-8 h-8 items-center justify-center"
        >
          <Ionicons
            name="arrow-back"
            size={20}
            color="#999999"
          />
        </Pressable>

        <Text className="text-xl font-semibold text-gray-900">
          Meus posts
        </Text>

        <Pressable
          onPress={() => {}}
          className="w-8 h-8 items-center justify-center"
        >
          <Ionicons
            name="search-outline"
            size={20}
            color="#999999"
          />
        </Pressable>

      </View>

      {/* Tabs */}
      <View className="mt-5">
        <Tabs
          tabs={['Planejamento', 'Ideias']}
          activeTab={activeTab}
          onChange={handleTabChange}
          backgroundClassName="bg-gray-50"
          activeClassName="text-primary-300"
          inactiveClassName="text-black"
          indicatorClassName="bg-primary-300"
        />
      </View>

      {/* Conteúdo */}
      <View className="flex-1 mt-4">
        <Slot />
      </View>

    </View>
  );
}