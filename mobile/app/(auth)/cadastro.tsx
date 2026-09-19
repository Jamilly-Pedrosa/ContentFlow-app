import { KeyboardAvoidingView, Platform, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';

import { Button } from '../../components/ui/Button';
import { Input } from '../../components/ui/Input';
import { Container } from '../../components/layout/Container';
import { PasswordInput } from '../../components/ui/PasswordInput';

export default function Cadastro() {
  return (
    <SafeAreaView className="flex-1">
      <Container className="flex-1">
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 64 : 0}
          className="flex-1"
        >
          {/* Título e Subtítulo */}
          <View className="items-center pt-6">
            <Text className="font-poppins-bold text-heading-2 text-text">
              Criar conta
            </Text>

            <Text className="mt-2 text-center font-poppins-regular text-small-text text-text-secondary">
              Cadastre-se para começar a planejar e criar suas ideias.
            </Text>
          </View>

          <KeyboardAwareScrollView
            className="flex-1"
            contentContainerStyle={{
              paddingTop: 48,
              paddingBottom: 24,
            }}
            enableOnAndroid
            extraScrollHeight={24}
            showsVerticalScrollIndicator={false}
            keyboardShouldPersistTaps="handled"
            keyboardDismissMode="on-drag"
          >
            {/* Formulário */}
            <View className="my-6 gap-6">

              <View>
                <Input 
                  label="Primeiro nome"
                  placeholder="Digite seu nome"  
                />
              </View>

              <View>
                <Input 
                  label="Sobrenome"
                  placeholder="Digite seu sobrenome" 
                />
              </View>

              <View>
                <Input 
                  label="E-mail"
                  placeholder="Digite seu email" 
                  keyboardType="email-address"
                  autoCapitalize='none'
                />
              </View>

              <View>
                <PasswordInput 
                  label="Senha"
                  placeholder="Digite sua senha" 
                  helperText='A senha deve ter no mínimo 8 caracteres.'
                />
              </View>

            </View>

          </KeyboardAwareScrollView>
        </KeyboardAvoidingView>

        <View className="w-full items-center pb-8">
          <Button
            type="primary"
            size="L"
            onPress={() => router.replace('/(tabs)')}
          >
            Cadastrar-se
          </Button>

          <View className="mt-2 flex-row items-center justify-center gap-2">
            <Text className="font-poppins-regular text-caption text-text-secondary">
              Já possui uma conta?{''}
            </Text>

            <Text
              onPress={() => router.push('/(auth)/login')}
              className="font-poppins-medium text-caption underline text-secondary-300"
            >
              Fazer login
            </Text>
          </View>
        </View>
      </Container>
    </SafeAreaView>
  );
}