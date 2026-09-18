import { KeyboardAvoidingView, Platform, ScrollView, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { EyeIcon } from 'phosphor-react-native';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Container } from '../../components/layout/Container';

export default function Cadastro() {
  return (
    <SafeAreaView className="flex-1">
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
        className="flex-1"
      >
        <Container className="flex-1">
          <ScrollView
            contentContainerClassName="flex-grow justify-between pb-8 pt-6"
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
          >
            {/* Título e Subtítulo */}
            <View className="items-center">
              <Text className="font-poppins-bold text-heading-2 text-text">
                Criar conta
              </Text>

              <Text className="mt-2 text-center font-poppins-regular text-small-text text-text-secondary">
                Cadastre-se para começar a planejar e criar suas ideias.
              </Text>
            </View>
          </ScrollView>
        </Container>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}