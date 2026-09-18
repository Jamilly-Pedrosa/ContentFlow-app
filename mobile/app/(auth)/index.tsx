import { Image, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';

import { Button } from '../../components/ui/Button';
import { Container } from '../../components/layout/Container';

export default function AuthIndex() {
  return (
    <SafeAreaView className="flex-1">
      <Container className="flex-1 justify-between">
        
        {/* Logo */}
        <View className="items-center pt-8">
          <Image
            source={require('../../assets/images-contentflow/logotipo.png')}
            resizeMode="contain"
          />
        </View>

        {/* Ilustração */}
        <View className="flex-1 justify-center items-center">
          <Image
            source={require('../../assets/images-contentflow/initial-onboarding.png')}
            className="h-80"
            resizeMode="contain"
          />
        </View>

        {/* Bloco inferior*/}
        <View className="pb-6">
          
          {/* Textos */}
          <View className="mb-8">
            <Text className="font-poppins-bold text-heading-2 text-black">
              Planeje posts, organize ideias e acompanhe seus resultados.
            </Text>

            <Text className="mt-2 font-poppins-regular text-body-text text-gray-900">
              Do planejamento ao crescimento.
            </Text>
          </View>

          {/* Ações */}
          <View className="gap-2">
            <Button
              type="primary"
              size="L"
              onPress={() => router.push('/(auth)/cadastro')}
            >
              Cadastre-se
            </Button>

            <Button
              type="secondary"
              size="L"
              onPress={() => router.push('/(auth)/login')}
            >
              Entrar
            </Button>
          </View>
        </View>

      </Container>
    </SafeAreaView>
  );
}