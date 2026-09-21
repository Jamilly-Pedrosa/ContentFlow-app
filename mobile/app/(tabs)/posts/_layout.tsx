import { Pressable, Text, View } from 'react-native';
import { Slot, router, usePathname } from 'expo-router';
import { Container } from '../../../components/layout/Container';
import { ArrowLeftIcon, MagnifyingGlassIcon } from "phosphor-react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
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
    <SafeAreaView className="flex-1">
      <Container className='flex-1'>

        {/* Header */}
        <View className="flex-row items-center justify-between mt-4">

          <Pressable
            onPress={() => router.back()}
            className="w-8 h-8 items-center justify-center"
          >
            <View>
                <ArrowLeftIcon color="#727272"/>
            </View>
          </Pressable>

          <Text className="font-poppins-medium text-heading-2 text-text">
            Meus posts
          </Text>

          <Pressable
            onPress={() => {}}
            className="w-8 h-8 items-center justify-center"
          >
            <View>
                <MagnifyingGlassIcon color="#727272"/>
            </View>


          </Pressable>

        </View>

        {/* Tabs */}
        <View className="mt-8">
          <Tabs
            tabs={['Planejamento', 'Ideias']}
            activeTab={activeTab}
            onChange={handleTabChange}    
          />
        </View>

        {/* Conteúdo */}
        <View className="flex-1 mt-4">
          <Slot />
        </View>

      </Container>
    </SafeAreaView>
  );
}